"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PostCategory, RecruitmentUpdate } from "@/lib/content-types";

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
  "Recruitment Tips",
];

export function UpdatesIndex({ updates }: { updates: RecruitmentUpdate[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PostCategory | "All">("All");

  const filteredUpdates = useMemo(() => {
    const search = query.trim().toLowerCase();

    return updates.filter((update) => {
      const matchesCategory =
        category === "All" || update.category === category;
      const matchesSearch =
        !search ||
        [update.title, update.excerpt, update.category, update.source, ...update.tags]
          .join(" ")
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, query, updates]);

  return (
    <div>
      <div className="rounded-card border border-brand-border bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1 lg:max-w-[460px]">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan"
            size={20}
          />
          <span className="sr-only">Search recruitment updates</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search updates, agencies, or sources"
            className="h-12 w-full rounded-pill border border-brand-border bg-brand-ice pl-12 pr-4 text-brand-navy outline-none focus:border-brand-cyan"
          />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[58%]">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
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

      <div className="mt-6">
        <p className="text-sm font-semibold text-brand-slate">
          {filteredUpdates.length} update{filteredUpdates.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        {filteredUpdates.map((update) => (
          <Card
            key={update.id}
            id={update.slug}
            className={`rounded-tile p-5 sm:p-6 ${
              update.important ? "border-brand-orange bg-brand-orange/5" : ""
            }`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={update.important ? "orange" : "blue"}>
                    {update.category}
                  </Badge>
                  {update.important ? (
                    <span className="inline-flex items-center gap-1 rounded-pill bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                      <AlertTriangle size={13} />
                      Important
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-slate">
                    <Calendar size={14} />
                    {formatDate(update.publishedAt)}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold leading-8 sm:text-2xl">
                  {update.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-slate sm:text-base">
                  {update.excerpt}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-slate">
                  {update.content}
                </p>
              </div>
              {update.source ? (
                <Link
                  href={update.source}
                  className="inline-flex shrink-0 items-center justify-center rounded-pill bg-brand-cyan px-4 py-2 text-sm font-bold text-white shadow-action"
                >
                  Official source
                </Link>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      {filteredUpdates.length === 0 ? (
        <Card className="mt-8 text-center">
          <p className="font-semibold">No recruitment updates match that search.</p>
          <p className="mt-2 text-brand-slate">
            Try another agency or a shorter search term.
          </p>
        </Card>
      ) : null}
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
