import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BmiCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "BMI Calculator - Fit4Force",
  description:
    "Calculate your body mass index as part of recruitment fitness preparation.",
  alternates: {
    canonical: absoluteUrl("/tools/bmi-calculator"),
  },
  openGraph: {
    title: "BMI Calculator - Fit4Force",
    description:
      "Calculate your body mass index as part of recruitment fitness preparation.",
    url: absoluteUrl("/tools/bmi-calculator"),
    type: "website",
  },
};

export default function BmiCalculatorPage() {
  const title = "BMI Calculator";
  const description =
    "Estimate your BMI and use it as one signal in your broader fitness preparation.";

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
              { label: "BMI Calculator" },
            ]}
          />
          <ToolShell title={title} description={description}>
            <BmiCalculator />
          </ToolShell>
        </Container>
      </Section>
    </main>
  );
}
