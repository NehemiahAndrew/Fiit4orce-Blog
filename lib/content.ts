import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import type { BlogPost, PostCategory, RecruitmentUpdate } from "@/lib/content-types";
import { samplePosts, sampleRecruitmentUpdates } from "@/lib/sample-content";

const dateSort = <T extends { publishedAt: string }>(items: T[]) =>
  [...items].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

function mergePosts(primaryPosts: BlogPost[], fallbackPosts: BlogPost[]) {
  const postsBySlug = new Map<string, BlogPost>();

  for (const post of fallbackPosts) {
    postsBySlug.set(post.slug, post);
  }

  for (const post of primaryPosts) {
    postsBySlug.set(post.slug, post);
  }

  return dateSort([...postsBySlug.values()]);
}

function normalizeDate(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return new Date().toISOString();
}

function parseList(value: string) {
  const trimmed = value.trim();

  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [trimmed.replace(/^["']|["']$/g, "")].filter(Boolean);
  }

  return trimmed
    .slice(1, -1)
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function parseFrontMatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { data: {} as Record<string, unknown>, content: raw.trim() };
  }

  const end = raw.indexOf("\n---", 3);

  if (end === -1) {
    return { data: {} as Record<string, unknown>, content: raw.trim() };
  }

  const frontMatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const data: Record<string, unknown> = {};

  for (const line of frontMatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    data[key] = value.startsWith("[")
      ? parseList(value)
      : value.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

function slugFromPermalink(permalink: unknown, fallback: string) {
  if (typeof permalink !== "string") {
    return fallback;
  }

  const clean = permalink.trim().replace(/^\/+|\/+$/g, "");
  return clean || fallback;
}

function fallbackFeaturedImage(category: PostCategory | string) {
  switch (category) {
    case "Air Force":
      return "/blog-images/naf-screening-day.png";
    case "Army":
      return "/blog-images/army-official-info-check.png";
    case "FRSC":
    case "Fitness":
      return "/screenshots/fitness.png";
    case "Police":
    case "NSCDC":
    case "Customs":
      return "/screenshots/dashboard.png";
    case "Navy":
    case "NDA":
    case "DSSC":
    case "Immigration":
      return "/screenshots/prep.png";
    default:
      return "/screenshots/dashboard.png";
  }
}

function normalizeFeaturedImage(
  featuredImage: unknown,
  category: PostCategory | string
) {
  if (typeof featuredImage !== "string") {
    return fallbackFeaturedImage(category);
  }

  const value = featuredImage.trim();

  if (!value || /^https?:\/\//i.test(value)) {
    return fallbackFeaturedImage(category);
  }

  return value;
}

async function getLocalMarkdownPosts() {
  const postsDir = path.join(process.cwd(), "_posts");

  try {
    const files = await readdir(postsDir);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const raw = await readFile(path.join(postsDir, file), "utf8");
        const { data, content } = parseFrontMatter(raw);
        const fallbackSlug = file
          .replace(/\.md$/, "")
          .replace(/^\d{4}-\d{2}-\d{2}-/, "");
        const slug = slugFromPermalink(data.permalink, fallbackSlug);
        const date = String(data.date ?? data.publishedAt ?? new Date().toISOString());
        const categories = Array.isArray(data.categories)
          ? data.categories.map(String)
          : ["Recruitment Tips"];

        return {
          id: slug,
          title: String(data.title ?? slug),
          slug,
          content,
          excerpt: String(data.description ?? data.excerpt ?? ""),
          category: String(categories[0] ?? "Recruitment Tips") as PostCategory,
          featuredImage: normalizeFeaturedImage(
            data.featuredImage,
            String(categories[0] ?? "Recruitment Tips") as PostCategory
          ),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          seoTitle: String(data.seoTitle ?? data.title ?? slug),
          seoDescription: String(data.seoDescription ?? data.description ?? ""),
          status: "published",
          createdAt: date,
          updatedAt: String(data.last_verified ?? data.updatedAt ?? date),
          publishedAt: date,
          author: String(data.author ?? "Fit4Force Editorial"),
          viewCount: 0,
        } satisfies BlogPost;
      })
    );

    return posts;
  } catch {
    return [];
  }
}

function mapPost(id: string, data: Record<string, unknown>): BlogPost {
  const category = String(data.category ?? "Recruitment Tips") as PostCategory;

  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    content: String(data.content ?? ""),
    excerpt: String(data.excerpt ?? ""),
    featuredImage: normalizeFeaturedImage(data.featuredImage, category),
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    seoTitle: String(data.seoTitle ?? data.title ?? ""),
    seoDescription: String(data.seoDescription ?? data.excerpt ?? ""),
    status: data.status === "published" ? "published" : "draft",
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
    publishedAt: normalizeDate(data.publishedAt),
    author: String(data.author ?? "Fit4Force Editorial"),
  };
}

function mapRecruitmentUpdate(
  id: string,
  data: Record<string, unknown>
): RecruitmentUpdate {
  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    excerpt: String(data.excerpt ?? ""),
    content: String(data.content ?? ""),
    category: String(data.category ?? "Recruitment Tips") as PostCategory,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.status === "published" ? "published" : "draft",
    important: Boolean(data.important),
    source: String(data.source ?? ""),
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
    publishedAt: normalizeDate(data.publishedAt),
  };
}

export async function getPublishedPosts(maxItems = 24) {
  const localPosts = await getLocalMarkdownPosts();

  if (!hasFirebaseConfig) {
    return mergePosts(localPosts, samplePosts)
      .slice(0, maxItems)
      .map((post) => ({
        ...post,
        featuredImage: normalizeFeaturedImage(post.featuredImage, post.category),
      }));
  }

  try {
    const snapshot = await getDocs(
      query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        limit(maxItems)
      )
    );

    const posts = snapshot.docs.map((doc) => mapPost(doc.id, doc.data()));
    return mergePosts([...localPosts, ...posts], samplePosts)
      .slice(0, maxItems)
      .map((post) => ({
        ...post,
        featuredImage: normalizeFeaturedImage(post.featuredImage, post.category),
      }));
  } catch {
    return mergePosts(localPosts, samplePosts)
      .slice(0, maxItems)
      .map((post) => ({
        ...post,
        featuredImage: normalizeFeaturedImage(post.featuredImage, post.category),
      }));
  }
}

export async function getPostBySlug(slug: string) {
  const localMarkdownPost =
    (await getLocalMarkdownPosts()).find((post) => post.slug === slug) ?? null;
  const localPost =
    localMarkdownPost ?? samplePosts.find((post) => post.slug === slug) ?? null;

  if (!hasFirebaseConfig) {
    return localPost;
  }

  try {
    const snapshot = await getDocs(
      query(
        collection(db, "posts"),
        where("status", "==", "published"),
        where("slug", "==", slug),
        limit(1)
      )
    );

    const doc = snapshot.docs[0];
    return doc ? mapPost(doc.id, doc.data()) : localPost;
  } catch {
    return localPost;
  }
}

export async function getRelatedPosts(post: BlogPost, maxItems = 3) {
  const posts = await getPublishedPosts(20);

  return posts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.category === post.category ||
          candidate.tags.some((tag) => post.tags.includes(tag)))
    )
    .slice(0, maxItems);
}

export async function getPublishedRecruitmentUpdates(maxItems = 24) {
  if (!hasFirebaseConfig) {
    return dateSort(sampleRecruitmentUpdates).slice(0, maxItems);
  }

  try {
    const snapshot = await getDocs(
      query(
        collection(db, "recruitment_updates"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        limit(maxItems)
      )
    );

    return snapshot.docs.map((doc) => mapRecruitmentUpdate(doc.id, doc.data()));
  } catch {
    return dateSort(sampleRecruitmentUpdates).slice(0, maxItems);
  }
}
