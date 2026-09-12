import * as React from "react";
import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "white" | "ice" | "gradient" | "navy";
};

const tones = {
  white: "bg-white text-brand-navy",
  ice: "bg-brand-ice text-brand-navy",
  gradient: "bg-brand-gradient text-white",
  navy: "bg-brand-navy text-white",
};

export function Section({
  className,
  tone = "white",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", tones[tone], className)}
      {...props}
    />
  );
}
