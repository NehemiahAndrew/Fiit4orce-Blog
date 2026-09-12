import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AgeEligibilityCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Age Eligibility Checker - Fit4Force",
  description:
    "Check your age against common recruitment preparation age-band patterns and verify official requirements.",
  alternates: {
    canonical: absoluteUrl("/tools/age-eligibility-checker"),
  },
  openGraph: {
    title: "Age Eligibility Checker - Fit4Force",
    description:
      "Check your age against common recruitment preparation age-band patterns and verify official requirements.",
    url: absoluteUrl("/tools/age-eligibility-checker"),
    type: "website",
  },
};

export default function AgeEligibilityCheckerPage() {
  const title = "Age Eligibility Checker";
  const description =
    "Compare your age with common recruitment preparation ranges before checking official agency rules.";

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
              { label: "Age Eligibility Checker" },
            ]}
          />
          <ToolShell title={title} description={description}>
            <AgeEligibilityCalculator />
          </ToolShell>
        </Container>
      </Section>
    </main>
  );
}
