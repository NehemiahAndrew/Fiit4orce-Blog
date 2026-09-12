export const siteConfig = {
  siteName: "Fit4Force",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fit4force.com.ng",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog.fit4force.com.ng",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.fit4force.com.ng",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.fit4force.com.ng",
  downloadUrl:
    process.env.NEXT_PUBLIC_DOWNLOAD_URL ??
    "https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force",
  description:
    "AI-powered exam prep, study materials, fitness training, and community for Nigerian military and paramilitary aspirants.",
};

export const toolRoutes = [
  {
    slug: "height-eligibility-checker",
    title: "Height Eligibility Checker",
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
  },
  {
    slug: "age-eligibility-checker",
    title: "Age Eligibility Checker",
  },
  {
    slug: "fitness-readiness-calculator",
    title: "Fitness Readiness Calculator",
  },
] as const;

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.siteUrl).toString();
}

export function blogAbsoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.blogUrl).toString();
}
