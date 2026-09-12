import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type {
  BlogPost,
  CategoryRecord,
  RecruitmentUpdate,
} from "@/lib/content-types";
import { sampleCategories, samplePosts, sampleRecruitmentUpdates } from "@/lib/sample-content";
import { sanitizeMultilineText, sanitizeText, slugify } from "@/lib/sanitize";

export type AdminSnapshot = {
  posts: BlogPost[];
  updates: RecruitmentUpdate[];
  categories: CategoryRecord[];
  media: Array<{ name: string; path: string; url: string }>;
};

const localMediaLibrary = [
  {
    name: "Preparation dashboard",
    path: "/screenshots/dashboard.png",
    url: "/screenshots/dashboard.png",
  },
  {
    name: "Preparation overview",
    path: "/screenshots/prep.png",
    url: "/screenshots/prep.png",
  },
  {
    name: "Fitness screen",
    path: "/screenshots/fitness.png",
    url: "/screenshots/fitness.png",
  },
  {
    name: "Fit4Force logo",
    path: "/brand/fit4force-logo.png",
    url: "/brand/fit4force-logo.png",
  },
];

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

export async function waitForUser() {
  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function signInAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  return signOut(auth);
}

export async function getAdminToken(user: User) {
  return user.getIdTokenResult(true);
}

export async function verifyRecentPassword(user: User, password: string) {
  const credential = EmailAuthProvider.credential(user.email ?? "", password);
  return reauthenticateWithCredential(user, credential);
}

function mapPost(id: string, data: Record<string, unknown>): BlogPost {
  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    content: String(data.content ?? ""),
    excerpt: String(data.excerpt ?? ""),
    featuredImage: String(data.featuredImage ?? ""),
    category: String(data.category ?? "Recruitment Tips") as BlogPost["category"],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    seoTitle: String(data.seoTitle ?? ""),
    seoDescription: String(data.seoDescription ?? ""),
    status: data.status === "published" ? "published" : data.status === "archived" ? "archived" : "draft",
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
    publishedAt: normalizeDate(data.publishedAt),
    author: String(data.author ?? ""),
    viewCount: Number(data.viewCount ?? 0),
  };
}

function mapUpdate(id: string, data: Record<string, unknown>): RecruitmentUpdate {
  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    excerpt: String(data.excerpt ?? ""),
    content: String(data.content ?? ""),
    category: String(data.category ?? "Recruitment Tips") as RecruitmentUpdate["category"],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.status === "published" ? "published" : data.status === "archived" ? "archived" : "draft",
    important: Boolean(data.important),
    source: String(data.source ?? ""),
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
    publishedAt: normalizeDate(data.publishedAt),
  };
}

function mapCategory(id: string, data: Record<string, unknown>): CategoryRecord {
  return {
    id,
    name: String(data.name ?? ""),
    slug: String(data.slug ?? id),
    description: String(data.description ?? ""),
    type: data.type === "update" ? "update" : "blog",
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
  };
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  try {
    const [postSnapshot, updateSnapshot, categorySnapshot] = await Promise.all([
      getDocs(query(collection(db, "posts"), orderBy("updatedAt", "desc"))),
      getDocs(
        query(collection(db, "recruitment_updates"), orderBy("updatedAt", "desc"))
      ),
      getDocs(query(collection(db, "categories"), orderBy("name", "asc"))),
    ]);

    return {
      posts: postSnapshot.docs.map((item) => mapPost(item.id, item.data())),
      updates: updateSnapshot.docs.map((item) => mapUpdate(item.id, item.data())),
      categories: categorySnapshot.docs.map((item) =>
        mapCategory(item.id, item.data())
      ),
      media: localMediaLibrary,
    };
  } catch {
    return {
      posts: samplePosts,
      updates: sampleRecruitmentUpdates,
      categories: sampleCategories,
      media: localMediaLibrary,
    };
  }
}

export async function savePost(post: Partial<BlogPost>) {
  const title = sanitizeText(post.title ?? "");
  const slug = slugify(post.slug || title);
  const now = serverTimestamp();
  const payload = {
    title,
    slug,
    content: sanitizeMultilineText(post.content ?? ""),
    excerpt: sanitizeText(post.excerpt ?? ""),
    featuredImage: sanitizeText(post.featuredImage ?? ""),
    category: sanitizeText(post.category ?? "Recruitment Tips"),
    tags: Array.isArray(post.tags)
      ? post.tags.map((tag) => sanitizeText(tag)).filter(Boolean)
      : [],
    seoTitle: sanitizeText(post.seoTitle ?? title),
    seoDescription: sanitizeText(post.seoDescription ?? post.excerpt ?? ""),
    status: post.status ?? "draft",
    author: sanitizeText(post.author ?? "Fit4Force Editorial"),
    updatedAt: now,
    publishedAt: post.status === "published" ? now : post.publishedAt ?? now,
    viewCount: Number(post.viewCount ?? 0),
  };

  if (post.id) {
    await updateDoc(doc(db, "posts", post.id), payload);
    return post.id;
  }

  const created = await addDoc(collection(db, "posts"), {
    ...payload,
    createdAt: now,
  });

  return created.id;
}

export async function deletePost(id: string) {
  await deleteDoc(doc(db, "posts", id));
}

export async function saveRecruitmentUpdate(update: Partial<RecruitmentUpdate>) {
  const title = sanitizeText(update.title ?? "");
  const slug = slugify(update.slug || title);
  const now = serverTimestamp();
  const payload = {
    title,
    slug,
    excerpt: sanitizeText(update.excerpt ?? ""),
    content: sanitizeMultilineText(update.content ?? ""),
    category: sanitizeText(update.category ?? "Recruitment Tips"),
    tags: Array.isArray(update.tags)
      ? update.tags.map((tag) => sanitizeText(tag)).filter(Boolean)
      : [],
    status: update.status ?? "draft",
    important: Boolean(update.important),
    source: sanitizeText(update.source ?? ""),
    updatedAt: now,
    publishedAt: update.status === "published" ? now : update.publishedAt ?? now,
  };

  if (update.id) {
    await updateDoc(doc(db, "recruitment_updates", update.id), payload);
    return update.id;
  }

  const created = await addDoc(collection(db, "recruitment_updates"), {
    ...payload,
    createdAt: now,
  });

  return created.id;
}

export async function deleteRecruitmentUpdate(id: string) {
  await deleteDoc(doc(db, "recruitment_updates", id));
}

export async function saveCategory(category: Partial<CategoryRecord>) {
  const name = sanitizeText(category.name ?? "");
  const slug = slugify(category.slug || name);
  const now = serverTimestamp();
  const payload = {
    name,
    slug,
    description: sanitizeText(category.description ?? ""),
    type: category.type === "update" ? "update" : "blog",
    updatedAt: now,
  };

  if (category.id) {
    await updateDoc(doc(db, "categories", category.id), payload);
    return category.id;
  }

  const created = doc(collection(db, "categories"));
  await setDoc(created, {
    ...payload,
    createdAt: now,
  });
  return created.id;
}

export async function deleteCategory(id: string) {
  await deleteDoc(doc(db, "categories", id));
}
