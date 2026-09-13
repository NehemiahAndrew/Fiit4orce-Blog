"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search, Tag, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPost, PostCategory } from "@/lib/content-types";

const categories: Array<PostCategory | "All"> = [
  "All",
  "Army",
  "Navy",
  "Air Force",
  "NDA",
  "DSSC",
  "Police",
  "NSCDC",
  "Immigration",
  "Customs",
  "FRSC",
  "Fitness",
  "Recruitment Tips",
];

const pageSize = 6;

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PostCategory | "All">("All");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesSearch =
        !search ||
        [post.title, post.excerpt, post.category, post.author, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, posts, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const visiblePosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);
  const featuredPost = filteredPosts[0];
  const gridPosts = visiblePosts;

  function updateCategory(nextCategory: PostCategory | "All") {
    setCategory(nextCategory);
    setPage(1);
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setPage(1);
  }

  return (
    <div>
      <div className="rounded-card border border-brand-border bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1 lg:max-w-[460px]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan"
              size={20}
            />
            <span className="sr-only">Search blog posts</span>
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search posts, tags, or agencies"
              className="h-12 w-full rounded-pill border border-brand-border bg-brand-ice pl-12 pr-4 text-brand-navy outline-none focus:border-brand-cyan"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[58%]">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => updateCategory(item)}
                className={`shrink-0 rounded-pill px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-brand-cyan text-white shadow-action"
                    : "bg-brand-skySoft text-brand-slate hover:text-brand-navy"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-slate">
            {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"} found
          </p>
          <p className="mt-1 text-sm text-brand-slate">
            Explore by agency, search topic, or continue from the featured guide.
          </p>
        </div>
        {(query || category !== "All") && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 self-start rounded-pill border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {gridPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            featured={Boolean(featuredPost) && index === 0 && post.id === featuredPost?.id}
          />
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <Card className="mt-8 text-center">
          <p className="font-semibold">No posts match your search yet.</p>
          <p className="mt-2 text-brand-slate">
            Try another category or a shorter search term.
          </p>
        </Card>
      ) : null}

      {filteredPosts.length > pageSize ? (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-pill border border-brand-border bg-white px-4 py-2 font-semibold text-brand-navy disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm font-semibold text-brand-slate">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-pill border border-brand-border bg-white px-4 py-2 font-semibold text-brand-navy disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const visibleTags = post.tags.slice(0, 2);

  return (
    <Card className="overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(31,44,70,0.12)]">
      <div className="relative aspect-[4/2.4] overflow-hidden rounded-t-card bg-brand-skySoft">
        <img
          src={post.featuredImage}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          {featured ? <Badge variant="cyan">Featured</Badge> : null}
          <Badge variant="blue">{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-slate">
            <Calendar size={14} />
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h2 className="mt-3 text-[15px] font-bold leading-6 sm:text-base">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-blue">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-brand-slate sm:text-sm sm:leading-6">
          {post.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-pill bg-brand-ice px-3 py-1 text-xs font-semibold text-brand-slate"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
          {post.tags.length > visibleTags.length ? (
            <span className="inline-flex items-center rounded-pill bg-brand-ice px-3 py-1 text-xs font-semibold text-brand-slate">
              +{post.tags.length - visibleTags.length}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-border pt-3">
          <span className="min-w-0 truncate text-[11px] font-semibold text-brand-slate sm:text-xs">
            {post.author}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan"
          >
            Read article
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
