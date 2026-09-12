import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, Ruler, Scale, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recruitment Preparation Tools - Fit4Force",
  description:
    "Use Fit4Force calculators for height eligibility, BMI, age eligibility, and fitness readiness.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "Recruitment Preparation Tools - Fit4Force",
    description:
      "Use Fit4Force calculators for height eligibility, BMI, age eligibility, and fitness readiness.",
    url: absoluteUrl("/tools"),
    type: "website",
  },
};

const tools = [
  {
    title: "Height Eligibility Checker",
    description:
      "Check your height against common recruitment preparation benchmarks.",
    href: "/tools/height-eligibility-checker",
    icon: Ruler,
  },
  {
    title: "BMI Calculator",
    description: "Estimate your BMI and understand your body composition range.",
    href: "/tools/bmi-calculator",
    icon: Scale,
  },
  {
    title: "Age Eligibility Checker",
    description:
      "Quickly compare your age against common recruitment age-band patterns.",
    href: "/tools/age-eligibility-checker",
    icon: Timer,
  },
  {
    title: "Fitness Readiness Calculator",
    description:
      "Estimate readiness using push-ups, sit-ups, and running time inputs.",
    href: "/tools/fitness-readiness-calculator",
    icon: Activity,
  },
];

export default function ToolsPage() {
  return (
    <main>
      <Section tone="gradient" className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <BrandLogo href="/" size="md" theme="light" className="mb-6" />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">
              Tools
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              Quick recruitment preparation calculators
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/80">
              Use these mobile-friendly tools for preparation guidance, then
              continue your full study and fitness plan in the Fit4Force app.
            </p>
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tools" },
            ]}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.href} className="rounded-tile">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                    <Icon size={24} />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold">{tool.title}</h2>
                  <p className="mt-3 leading-7 text-brand-slate">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-pill bg-brand-cyan px-5 py-3 text-sm font-bold text-white shadow-action"
                  >
                    Open tool
                    <ArrowRight size={16} />
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
