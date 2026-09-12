import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, Clock3, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { PublicHeader } from "@/components/layout/public-header";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ViewTracker } from "@/components/seo/view-tracker";
import { ShareActions } from "@/components/content/share-actions";
import { getPostBySlug, getRelatedPosts } from "@/lib/content";
import { absoluteUrl, blogAbsoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found - Fit4Force",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: blogAbsoluteUrl(`/${post.slug}`),
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [blogAbsoluteUrl(post.featuredImage)],
      type: "article",
      url: blogAbsoluteUrl(`/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const relatedPosts = await getRelatedPosts(post);
  const shareUrl = blogAbsoluteUrl(`/${post.slug}`);
  const headings = extractHeadings(post.content);
  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 200)
  );

  return (
    <main>
      <ViewTracker slug={post.slug} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: {
            "@type": "Person",
            name: post.author,
          },
          image: [blogAbsoluteUrl(post.featuredImage)],
          mainEntityOfPage: blogAbsoluteUrl(`/${post.slug}`),
        }}
      />
      <Section tone="white" className="py-10 md:py-14">
        <Container>
          <PublicHeader theme="dark" />
          <div className="mt-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-brand-cyan"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <article>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="blue">{post.category}</Badge>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-slate">
                  <Calendar size={15} />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-slate">
                  <Clock3 size={15} />
                  {readingTime} min read
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-brand-slate sm:text-lg sm:leading-8">
                {post.excerpt}
              </p>
              <p className="mt-5 text-sm font-bold text-brand-slate">
                By {post.author}
              </p>

              <div className="relative mt-8 aspect-[16/7.2] max-w-[760px] overflow-hidden rounded-card bg-brand-skySoft shadow-card">
                <img
                  src={post.featuredImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-b border-brand-border pb-7">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-pill bg-brand-ice px-3 py-1 text-sm font-semibold text-brand-slate"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose-content mt-10 max-w-none">
                {renderContent(post.content)}
              </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {headings.length > 0 ? (
                <Card>
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-cyan" />
                    <h2 className="text-lg font-bold">On this page</h2>
                  </div>
                  <div className="mt-4 space-y-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block rounded-xl bg-brand-ice px-3 py-2 text-sm font-semibold text-brand-slate transition hover:bg-brand-skySoft hover:text-brand-navy"
                      >
                        {heading.label}
                      </a>
                    ))}
                  </div>
                </Card>
              ) : null}

              <Card>
                <h2 className="text-lg font-bold">Share this article</h2>
                <ShareActions shareUrl={shareUrl} title={post.title} />
              </Card>

              <Card>
                <h2 className="text-lg font-bold">Launch Fit4Force</h2>
                <p className="mt-3 text-sm leading-6 text-brand-slate">
                  Continue your preparation with study materials, fitness
                  training, progress tracking, and community features.
                </p>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_DOWNLOAD_URL ??
                    "https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force"
                  }
                  className="mt-5 inline-flex rounded-pill bg-brand-cyan px-5 py-3 text-sm font-bold text-white shadow-action"
                >
                  Download App
                </Link>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <h2 className="text-3xl font-bold">Related articles</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Card key={related.id} className="rounded-tile">
                <Badge variant="blue">{related.category}</Badge>
                <h3 className="mt-4 text-xl font-bold leading-7">
                  <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-slate">
                  {related.excerpt}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

function renderContent(content: string) {
  const blocks: Array<
    | { type: "heading"; value: string }
    | { type: "list"; items: string[] }
    | { type: "rule" }
    | { type: "paragraph"; value: string }
  > = [];
  const lines = content.split("\n");
  let currentList: string[] = [];

  function flushList() {
    if (currentList.length > 0) {
      blocks.push({ type: "list", items: currentList });
      currentList = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "heading", value: line.replace("## ", "") });
      continue;
    }

    if (line.startsWith("- ")) {
      currentList.push(line.replace("- ", ""));
      continue;
    }

    if (line.trim() === "---") {
      flushList();
      blocks.push({ type: "rule" });
      continue;
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

    flushList();
    blocks.push({ type: "paragraph", value: line });
  }

  flushList();

  return blocks.map((block, index) => {
    if (block.type === "heading") {
      return (
        <h2
          id={slugifyHeading(block.value)}
          key={index}
          className="mt-10 scroll-mt-24 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl"
        >
          {block.value}
        </h2>
      );
    }

    if (block.type === "list") {
      return (
        <ul key={index} className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="ml-5 list-disc text-base leading-7 text-brand-slate sm:text-lg sm:leading-8"
            >
              {renderInlineContent(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (block.type === "rule") {
      return <hr key={index} className="my-8 border-brand-border" />;
    }

    return (
      <p key={index} className="mt-5 text-base leading-7 text-brand-slate sm:text-lg sm:leading-8">
        {renderInlineContent(block.value)}
      </p>
    );
  });
}

function renderInlineContent(value: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: Array<{ type: "text"; value: string } | { type: "link"; label: string; href: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: value.slice(lastIndex, match.index) });
    }

    parts.push({
      type: "link",
      label: match[1],
      href: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: "text", value: value.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return value;
  }

  return parts.map((part, index) => {
    if (part.type === "text") {
      return <Fragment key={index}>{part.value}</Fragment>;
    }

    const isInternal = part.href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          key={index}
          href={part.href}
          className="font-semibold text-brand-cyan underline-offset-4 hover:underline"
        >
          {part.label}
        </Link>
      );
    }

    return (
      <a
        key={index}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-cyan underline-offset-4 hover:underline"
      >
        {part.label}
      </a>
    );
  });
}

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const label = line.replace("## ", "");
      return {
        label,
        id: slugifyHeading(label),
      };
    });
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
