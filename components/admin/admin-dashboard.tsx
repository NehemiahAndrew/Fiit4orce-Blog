"use client";

import { useEffect, useState, useTransition } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  LogOut,
  Megaphone,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import type {
  BlogPost,
  CategoryRecord,
  RecruitmentUpdate,
} from "@/lib/content-types";
import {
  deleteCategory,
  deletePost,
  deleteRecruitmentUpdate,
  getAdminSnapshot,
  getAdminToken,
  saveCategory,
  savePost,
  saveRecruitmentUpdate,
  signInAdmin,
  signOutAdmin,
  waitForUser,
} from "@/lib/admin";
import { slugify } from "@/lib/sanitize";

type AdminState = {
  posts: BlogPost[];
  updates: RecruitmentUpdate[];
  categories: CategoryRecord[];
  media: Array<{ name: string; path: string; url: string }>;
};

type TabKey = "overview" | "posts" | "updates" | "media" | "categories";

const defaultPost: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "Recruitment Tips",
  tags: [],
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  author: "Fit4Force Editorial",
  viewCount: 0,
};

const defaultUpdate: Partial<RecruitmentUpdate> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Recruitment Tips",
  tags: [],
  status: "draft",
  important: false,
  source: "",
};

const defaultCategory: Partial<CategoryRecord> = {
  name: "",
  slug: "",
  description: "",
  type: "blog",
};

const tabs: Array<{ key: TabKey; label: string; icon: ReactNode }> = [
  { key: "overview", label: "Overview", icon: <BarChart3 size={17} /> },
  { key: "posts", label: "Blog", icon: <FileText size={17} /> },
  { key: "updates", label: "Updates", icon: <Megaphone size={17} /> },
  { key: "media", label: "Media", icon: <ImageIcon size={17} /> },
  { key: "categories", label: "Categories", icon: <Tags size={17} /> },
];

export function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [status, setStatus] = useState("Checking admin session...");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snapshot, setSnapshot] = useState<AdminState>({
    posts: [],
    updates: [],
    categories: [],
    media: [],
  });
  const [postForm, setPostForm] = useState<Partial<BlogPost>>(defaultPost);
  const [updateForm, setUpdateForm] =
    useState<Partial<RecruitmentUpdate>>(defaultUpdate);
  const [categoryForm, setCategoryForm] =
    useState<Partial<CategoryRecord>>(defaultCategory);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let mounted = true;

    startTransition(async () => {
      const user = await waitForUser();

      if (!mounted) {
        return;
      }

      if (!user) {
        setStatus("Sign in with your admin email to continue.");
        return;
      }

      const token = await getAdminToken(user);
      if (!mounted) {
        return;
      }

      setIsAuthenticated(true);
      if (!token.claims.admin) {
        setStatus(
          "Your account signed in successfully, but it does not have the admin claim yet."
        );
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);
      setStatus("Loading dashboard data...");
      const data = await getAdminSnapshot();
      if (!mounted) {
        return;
      }

      setSnapshot(data);
      setStatus("Dashboard ready.");
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function refreshData(message = "Dashboard ready.") {
    const data = await getAdminSnapshot();
    setSnapshot(data);
    setStatus(message);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");

    startTransition(async () => {
      try {
        const result = await signInAdmin(email, password);
        const token = await getAdminToken(result.user);
        setIsAuthenticated(true);

        if (!token.claims.admin) {
          setStatus(
            "Signed in, but this account does not have the admin claim. Run the bootstrap script first."
          );
          setIsAdmin(false);
          return;
        }

        setIsAdmin(true);
        await refreshData("Dashboard ready.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Login failed.");
      }
    });
  }

  async function handleLogout() {
    await signOutAdmin();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setSnapshot({ posts: [], updates: [], categories: [], media: [] });
    setStatus("Signed out.");
  }

  async function handleSavePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving article...");

    startTransition(async () => {
      try {
        await savePost(postForm);
        setPostForm(defaultPost);
        await refreshData("Article saved.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Failed to save article.");
      }
    });
  }

  async function handleSaveUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving recruitment update...");

    startTransition(async () => {
      try {
        await saveRecruitmentUpdate(updateForm);
        setUpdateForm(defaultUpdate);
        await refreshData("Recruitment update saved.");
      } catch (error) {
        setStatus(
          error instanceof Error ? error.message : "Failed to save recruitment update."
        );
      }
    });
  }

  async function handleSaveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving category...");

    startTransition(async () => {
      try {
        await saveCategory(categoryForm);
        setCategoryForm(defaultCategory);
        await refreshData("Category saved.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Failed to save category.");
      }
    });
  }

  async function handleDeletePost(id: string) {
    setStatus("Deleting article...");
    startTransition(async () => {
      await deletePost(id);
      await refreshData("Article deleted.");
    });
  }

  async function handleDeleteUpdate(id: string) {
    setStatus("Deleting recruitment update...");
    startTransition(async () => {
      await deleteRecruitmentUpdate(id);
      await refreshData("Recruitment update deleted.");
    });
  }

  async function handleDeleteCategory(id: string) {
    setStatus("Deleting category...");
    startTransition(async () => {
      await deleteCategory(id);
      await refreshData("Category deleted.");
    });
  }

  const totalViews = snapshot.posts.reduce(
    (sum, post) => sum + Number(post.viewCount ?? 0),
    0
  );

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f7fb] p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-3 text-slate-900">
            <ShieldCheck className="text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold">Fit4Force Admin</h1>
              <p className="text-sm text-slate-500">Email login only</p>
            </div>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <Field
              label="Admin email"
              value={email}
              onChange={setEmail}
              placeholder="admin@fit4force.com.ng"
              type="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              type="password"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-sm leading-6 text-slate-500">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <BrandLogo href="/admin" size="md" theme="dark" />
          <div className="mt-4">
            <h1 className="text-xl font-bold">Fit4Force Admin</h1>
            <p className="text-sm text-slate-500">admin.fit4force.com.ng</p>
          </div>
          <nav className="mt-8 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </aside>

        <main className="p-6 lg:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="mt-1 text-sm text-slate-500">{status}</p>
            </div>
          </div>

          {activeTab === "overview" ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={<FileText size={18} />} label="Articles" value={snapshot.posts.length} />
              <StatCard icon={<Users size={18} />} label="Total views" value={totalViews} />
              <StatCard icon={<Megaphone size={18} />} label="Recruitment updates" value={snapshot.updates.length} />
              <StatCard icon={<Tags size={18} />} label="Categories" value={snapshot.categories.length} />
            </div>
          ) : null}

          {activeTab === "posts" ? (
            <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
              <Panel title="Create or edit article">
                <PostForm
                  form={postForm}
                  categories={snapshot.categories}
                  onChange={setPostForm}
                  onSubmit={handleSavePost}
                  pending={isPending}
                />
              </Panel>
              <Panel title="Articles">
                <RecordTable
                  rows={snapshot.posts.map((post) => ({
                    id: post.id,
                    title: post.title,
                    subtitle: `${post.category} · ${post.status} · ${post.viewCount ?? 0} views`,
                    onEdit: () => setPostForm(post),
                    onDelete: () => handleDeletePost(post.id),
                  }))}
                />
              </Panel>
            </div>
          ) : null}

          {activeTab === "updates" ? (
            <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
              <Panel title="Create or edit update">
                <UpdateForm
                  form={updateForm}
                  categories={snapshot.categories}
                  onChange={setUpdateForm}
                  onSubmit={handleSaveUpdate}
                  pending={isPending}
                />
              </Panel>
              <Panel title="Recruitment updates">
                <RecordTable
                  rows={snapshot.updates.map((update) => ({
                    id: update.id,
                    title: update.title,
                    subtitle: `${update.category} · ${update.status}${
                      update.important ? " · Important" : ""
                    }`,
                    onEdit: () => setUpdateForm(update),
                    onDelete: () => handleDeleteUpdate(update.id),
                  }))}
                />
              </Panel>
            </div>
          ) : null}

          {activeTab === "media" ? (
            <div className="mt-8 grid gap-6 xl:grid-cols-[360px_1fr]">
              <Panel title="Local asset workflow">
                <div className="space-y-4 text-sm leading-6 text-slate-600">
                  <p>
                    This project is using local images from <code>public/</code> so
                    it stays compatible with the Firebase Spark plan.
                  </p>
                  <p>
                    Pick one of the assets on the right and paste its path into the
                    article&apos;s <strong>Featured image URL</strong> field.
                  </p>
                  <p>
                    To add more images later, place them inside <code>public/</code>{" "}
                    and redeploy the site.
                  </p>
                </div>
              </Panel>
              <Panel title="Local media library">
                <div className="grid gap-4 md:grid-cols-2">
                  {snapshot.media.map((item) => (
                    <div
                      key={item.path}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="h-32 w-full rounded-2xl object-cover"
                      />
                      <p className="mt-3 truncate text-sm font-semibold">{item.name}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">{item.path}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(item.url).catch(() => {})
                          }
                          className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                        >
                          Copy path
                        </button>
                      </div>
                    </div>
                  ))}
                  {snapshot.media.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                      No local images found yet.
                    </div>
                  ) : null}
                </div>
              </Panel>
            </div>
          ) : null}

          {activeTab === "categories" ? (
            <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
              <Panel title="Create or edit category">
                <CategoryForm
                  form={categoryForm}
                  onChange={setCategoryForm}
                  onSubmit={handleSaveCategory}
                  pending={isPending}
                />
              </Panel>
              <Panel title="Categories">
                <RecordTable
                  rows={snapshot.categories.map((category) => ({
                    id: category.id,
                    title: category.name,
                    subtitle: `${category.type} · ${category.slug}`,
                    onEdit: () => setCategoryForm(category),
                    onDelete: () => handleDeleteCategory(category.id),
                  }))}
                />
              </Panel>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-4 text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-sky-500"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-sky-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PostForm({
  form,
  categories,
  onChange,
  onSubmit,
  pending,
}: {
  form: Partial<BlogPost>;
  categories: CategoryRecord[];
  onChange: (value: Partial<BlogPost>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
}) {
  const options = categories
    .filter((category) => category.type === "blog")
    .map((category) => category.name);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field
        label="Title"
        value={form.title ?? ""}
        onChange={(title) =>
          onChange({
            ...form,
            title,
            slug: slugify(title),
            seoTitle: title,
          })
        }
        placeholder="Article title"
      />
      <Field
        label="Slug"
        value={form.slug ?? ""}
        onChange={(slug) => onChange({ ...form, slug })}
        placeholder="article-slug"
      />
      <TextAreaField
        label="Excerpt"
        value={form.excerpt ?? ""}
        onChange={(excerpt) => onChange({ ...form, excerpt, seoDescription: excerpt })}
        placeholder="Short summary"
      />
      <TextAreaField
        label="Content"
        value={form.content ?? ""}
        onChange={(content) => onChange({ ...form, content })}
        placeholder="Markdown-style content"
        rows={8}
      />
      <Field
        label="Featured image URL"
        value={form.featuredImage ?? ""}
        onChange={(featuredImage) => onChange({ ...form, featuredImage })}
        placeholder="/screenshots/dashboard.png"
      />
      <SelectField
        label="Category"
        value={form.category ?? "Recruitment Tips"}
        onChange={(category) => onChange({ ...form, category: category as BlogPost["category"] })}
        options={options.length > 0 ? options : ["Recruitment Tips", "Fitness"]}
      />
      <Field
        label="Tags"
        value={(form.tags ?? []).join(", ")}
        onChange={(tags) =>
          onChange({
            ...form,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          })
        }
        placeholder="screening, past-questions"
      />
      <SelectField
        label="Status"
        value={form.status ?? "draft"}
        onChange={(status) => onChange({ ...form, status: status as BlogPost["status"] })}
        options={["draft", "published", "archived"]}
      />
      <Field
        label="Author"
        value={form.author ?? "Fit4Force Editorial"}
        onChange={(author) => onChange({ ...form, author })}
        placeholder="Author name"
      />
      <button
        type="submit"
        className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white"
      >
        {pending ? "Saving..." : form.id ? "Update article" : "Create article"}
      </button>
    </form>
  );
}

function UpdateForm({
  form,
  categories,
  onChange,
  onSubmit,
  pending,
}: {
  form: Partial<RecruitmentUpdate>;
  categories: CategoryRecord[];
  onChange: (value: Partial<RecruitmentUpdate>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
}) {
  const options = categories.map((category) => category.name);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field
        label="Title"
        value={form.title ?? ""}
        onChange={(title) =>
          onChange({
            ...form,
            title,
            slug: slugify(title),
          })
        }
        placeholder="Update title"
      />
      <Field
        label="Slug"
        value={form.slug ?? ""}
        onChange={(slug) => onChange({ ...form, slug })}
        placeholder="update-slug"
      />
      <TextAreaField
        label="Excerpt"
        value={form.excerpt ?? ""}
        onChange={(excerpt) => onChange({ ...form, excerpt })}
        placeholder="Short summary"
      />
      <TextAreaField
        label="Content"
        value={form.content ?? ""}
        onChange={(content) => onChange({ ...form, content })}
        placeholder="Full update body"
        rows={7}
      />
      <SelectField
        label="Category"
        value={form.category ?? "Recruitment Tips"}
        onChange={(category) =>
          onChange({ ...form, category: category as RecruitmentUpdate["category"] })
        }
        options={options.length > 0 ? options : ["Recruitment Tips", "FRSC"]}
      />
      <Field
        label="Tags"
        value={(form.tags ?? []).join(", ")}
        onChange={(tags) =>
          onChange({
            ...form,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          })
        }
        placeholder="recruitment-dates, scam-alert"
      />
      <Field
        label="Official source URL"
        value={form.source ?? ""}
        onChange={(source) => onChange({ ...form, source })}
        placeholder="https://..."
      />
      <SelectField
        label="Status"
        value={form.status ?? "draft"}
        onChange={(status) =>
          onChange({ ...form, status: status as RecruitmentUpdate["status"] })
        }
        options={["draft", "published", "archived"]}
      />
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={Boolean(form.important)}
          onChange={(event) =>
            onChange({ ...form, important: event.target.checked })
          }
        />
        Mark as important
      </label>
      <button
        type="submit"
        className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white"
      >
        {pending ? "Saving..." : form.id ? "Update recruitment update" : "Create recruitment update"}
      </button>
    </form>
  );
}

function CategoryForm({
  form,
  onChange,
  onSubmit,
  pending,
}: {
  form: Partial<CategoryRecord>;
  onChange: (value: Partial<CategoryRecord>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field
        label="Category name"
        value={form.name ?? ""}
        onChange={(name) =>
          onChange({
            ...form,
            name,
            slug: slugify(name),
          })
        }
        placeholder="Army"
      />
      <Field
        label="Slug"
        value={form.slug ?? ""}
        onChange={(slug) => onChange({ ...form, slug })}
        placeholder="army"
      />
      <TextAreaField
        label="Description"
        value={form.description ?? ""}
        onChange={(description) => onChange({ ...form, description })}
        placeholder="Short internal description"
      />
      <SelectField
        label="Type"
        value={form.type ?? "blog"}
        onChange={(type) => onChange({ ...form, type: type as CategoryRecord["type"] })}
        options={["blog", "update"]}
      />
      <button
        type="submit"
        className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white"
      >
        {pending ? "Saving..." : form.id ? "Update category" : "Create category"}
      </button>
    </form>
  );
}

function RecordTable({
  rows,
}: {
  rows: Array<{
    id: string;
    title: string;
    subtitle: string;
    onEdit: () => void;
    onDelete: () => void;
  }>;
}) {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-semibold text-slate-900">{row.title}</p>
            <p className="text-sm text-slate-500">{row.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={row.onEdit}
              className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={row.onDelete}
              className="rounded-2xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {rows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
          No records yet.
        </div>
      ) : null}
    </div>
  );
}
