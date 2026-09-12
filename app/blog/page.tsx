import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PublicHeader } from "@/components/layout/public-header";
import { Section } from "@/components/layout/section";
import { BlogIndex } from "@/components/content/blog-index";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getPublishedPosts } from "@/lib/content";
import { blogAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fit4Force Blog - Recruitment Preparation Guides",
  description:
    "Read Fit4Force guides on Nigerian military and paramilitary recruitment preparation, fitness, screening, and aptitude practice.",
  alternates: {
    canonical: blogAbsoluteUrl("/"),
  },
  openGraph: {
    title: "Fit4Force Blog - Recruitment Preparation Guides",
    description:
      "Read Fit4Force guides on Nigerian military and paramilitary recruitment preparation, fitness, screening, and aptitude practice.",
    url: blogAbsoluteUrl("/"),
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts(48);

  return (
    <main>
      <Section tone="gradient" className="py-14 md:py-18">
        <Container>
          <PublicHeader theme="light" />
          <div className="max-w-3xl">
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-white/75 md:mt-10">
              Blog
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              Recruitment preparation guides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Practical study, fitness, screening, and recruitment tips for
              Nigerian military and paramilitary aspirants.
            </p>
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          <BlogIndex posts={posts} />
        </Container>
      </Section>
    </main>
  );
}
