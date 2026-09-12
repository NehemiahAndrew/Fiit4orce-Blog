import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { HeightEligibilityCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Height Eligibility Checker - Fit4Force",
  description:
    "Check your height against common recruitment preparation benchmarks and confirm official agency requirements.",
  alternates: {
    canonical: absoluteUrl("/tools/height-eligibility-checker"),
  },
  openGraph: {
    title: "Height Eligibility Checker - Fit4Force",
    description:
      "Check your height against common recruitment preparation benchmarks and confirm official agency requirements.",
    url: absoluteUrl("/tools/height-eligibility-checker"),
    type: "website",
  },
};

export default function HeightEligibilityCheckerPage() {
  return (
    <ToolPageShell
      title="Height Eligibility Checker"
      description="Estimate whether your height may fit common recruitment preparation benchmarks."
    >
      <HeightEligibilityCalculator />
    </ToolPageShell>
  );
}

function ToolPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
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
              { label: "Height Eligibility Checker" },
            ]}
          />
          <ToolShell title={title} description={description}>
            {children}
          </ToolShell>
        </Container>
      </Section>
    </main>
  );
}
