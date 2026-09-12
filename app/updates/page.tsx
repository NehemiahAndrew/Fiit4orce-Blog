import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { UpdatesIndex } from "@/components/content/updates-index";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BrandLogo } from "@/components/ui/brand-logo";
import { getPublishedRecruitmentUpdates } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recruitment Updates - Fit4Force",
  description:
    "Latest Nigerian military and paramilitary recruitment updates, with official-source reminders and important announcements.",
  alternates: {
    canonical: absoluteUrl("/updates"),
  },
  openGraph: {
    title: "Recruitment Updates - Fit4Force",
    description:
      "Latest Nigerian military and paramilitary recruitment updates, with official-source reminders and important announcements.",
    url: absoluteUrl("/updates"),
    type: "website",
  },
};

export default async function UpdatesPage() {
  const updates = await getPublishedRecruitmentUpdates(48);

  return (
    <main>
      <Section tone="gradient" className="py-14 md:py-18">
        <Container>
          <div className="max-w-3xl">
            <BrandLogo href="/" size="md" theme="light" className="mb-6" />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">
              Recruitment Updates
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              Official-source focused recruitment notices
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Search and filter public recruitment updates. Dates, fees, age
              limits, and requirements should always trace back to official
              agency sources.
            </p>
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Updates" },
            ]}
          />
          <UpdatesIndex updates={updates} />
        </Container>
      </Section>
    </main>
  );
}
