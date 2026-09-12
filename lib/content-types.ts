export type PostCategory =
  | "Army"
  | "Navy"
  | "Air Force"
  | "NDA"
  | "DSSC"
  | "Police"
  | "NSCDC"
  | "Immigration"
  | "Customs"
  | "FRSC"
  | "Fitness"
  | "Recruitment Tips";

export type ContentStatus = "draft" | "published" | "archived";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: PostCategory;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: string;
  viewCount?: number;
};

export type RecruitmentUpdate = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  tags: string[];
  status: ContentStatus;
  important: boolean;
  source: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: "blog" | "update";
  createdAt: string;
  updatedAt: string;
};
