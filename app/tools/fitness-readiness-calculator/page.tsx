import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FitnessReadinessCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fitness Readiness Calculator - Fit4Force",
  description:
    "Estimate recruitment fitness readiness using push-ups, sit-ups, and running time inputs.",
  alternates: {
    canonical: absoluteUrl("/tools/fitness-readiness-calculator"),
  },
  openGraph: {
    title: "Fitness Readiness Calculator - Fit4Force",
    description:
      "Estimate recruitment fitness readiness using push-ups, sit-ups, and running time inputs.",
    url: absoluteUrl("/tools/fitness-readiness-calculator"),
    type: "website",
  },
};

export default function FitnessReadinessCalculatorPage() {
  const title = "Fitness Readiness Calculator";
  const description =
    "Estimate your current readiness from simple fitness inputs and keep training consistently.";

  return (
    <main>
      <Section tone="gradient" className="py-14 md:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">
            Fit4Force Tool
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            {description}
          </p>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Fitness Readiness Calculator" },
            ]}
          />
          <ToolShell title={title} description={description}>
            <FitnessReadinessCalculator />
          </ToolShell>
        </Container>
      </Section>
    </main>
  );
}
