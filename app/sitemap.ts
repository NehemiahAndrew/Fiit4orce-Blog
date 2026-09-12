import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedRecruitmentUpdates } from "@/lib/content";
import { absoluteUrl, siteConfig, toolRoutes } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, updates] = await Promise.all([
    getPublishedPosts(200),
    getPublishedRecruitmentUpdates(200),
  ]);

  const staticRoutes = [
    "",
    "/blog",
    "/updates",
    "/tools",
    ...toolRoutes.map((tool) => `/tools/${tool.slug}`),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt || post.publishedAt),
    })),
    ...updates.map((update) => ({
      url: absoluteUrl(`/updates#${update.slug}`),
      lastModified: new Date(update.updatedAt || update.publishedAt),
    })),
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
    },
  ];
}
