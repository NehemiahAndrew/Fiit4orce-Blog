"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Activity, CheckCircle2, Ruler, Scale, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HeightEligibilityCalculator() {
  const [height, setHeight] = useState(170);

  const result = useMemo(() => {
    if (height >= 170) {
      return "Your height is within a common male recruitment benchmark, but always confirm the current agency requirement.";
    }

    if (height >= 165) {
      return "Your height may fit some female or agency-specific benchmarks, but you must confirm the current official requirement.";
    }

    return "Your height is below many common recruitment benchmarks. Check the official agency requirement before making decisions.";
  }, [height]);

  return (
    <ToolCard icon={<Ruler />} title="Height Eligibility Checker">
      <NumberField
        label="Height in cm"
        value={height}
        min={120}
        max={220}
        onChange={setHeight}
      />
      <Result text={result} />
    </ToolCard>
  );
}

export function BmiCalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  const bmi = useMemo(() => {
    const meters = height / 100;
    return weight / (meters * meters);
  }, [height, weight]);

  const result =
    bmi < 18.5
      ? "Underweight range"
      : bmi < 25
        ? "Normal range"
        : bmi < 30
          ? "Overweight range"
          : "Obese range";

  return (
    <ToolCard icon={<Scale />} title="BMI Calculator">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Height in cm"
          value={height}
          min={120}
          max={220}
          onChange={setHeight}
        />
        <NumberField
          label="Weight in kg"
          value={weight}
          min={35}
          max={180}
          onChange={setWeight}
        />
      </div>
      <Result text={`BMI ${bmi.toFixed(1)} - ${result}`} />
    </ToolCard>
  );
}

export function AgeEligibilityCalculator() {
  const [age, setAge] = useState(22);

  const result = useMemo(() => {
    if (age < 18) {
      return "You may be below many recruitment age bands. Confirm the current official agency requirement.";
    }

    if (age <= 30) {
      return "Your age falls within many common recruitment ranges, but each agency and role can differ.";
    }

    return "Your age may exceed some entry-level recruitment bands. Check the official portal for role-specific guidance.";
  }, [age]);

  return (
    <ToolCard icon={<Timer />} title="Age Eligibility Checker">
      <NumberField label="Age" value={age} min={14} max={60} onChange={setAge} />
      <Result text={result} />
    </ToolCard>
  );
}

export function FitnessReadinessCalculator() {
  const [pushups, setPushups] = useState(20);
  const [situps, setSitups] = useState(25);
  const [runMinutes, setRunMinutes] = useState(14);

  const score = useMemo(() => {
    const pushupScore = Math.min(35, pushups);
    const situpScore = Math.min(35, situps);
    const runScore = Math.max(0, 30 - Math.max(0, runMinutes - 10) * 4);
    return Math.round(pushupScore + situpScore + runScore);
  }, [pushups, runMinutes, situps]);

  const result =
    score >= 80
      ? "Strong readiness signal"
      : score >= 55
        ? "Moderate readiness signal"
        : "Needs more conditioning";

  return (
    <ToolCard icon={<Activity />} title="Fitness Readiness Calculator">
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Push-ups"
          value={pushups}
          min={0}
          max={100}
          onChange={setPushups}
        />
        <NumberField
          label="Sit-ups"
          value={situps}
          min={0}
          max={100}
          onChange={setSitups}
        />
        <NumberField
          label="Run time (mins)"
          value={runMinutes}
          min={5}
          max={40}
          onChange={setRunMinutes}
        />
      </div>
      <Result text={`${score}/100 - ${result}`} />
    </ToolCard>
  );
}

function ToolCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
          {icon}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="mt-8 space-y-5">{children}</div>
    </Card>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-brand-navy">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-12 w-full rounded-pill border border-brand-border bg-brand-ice px-4 font-semibold text-brand-navy outline-none focus:border-brand-cyan"
      />
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-brand-cyan"
      />
    </label>
  );
}

function Result({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-tile bg-brand-skySoft p-4">
      <CheckCircle2 className="mt-1 shrink-0 text-brand-green" />
      <p className="font-semibold leading-7 text-brand-navy">{text}</p>
    </div>
  );
}
