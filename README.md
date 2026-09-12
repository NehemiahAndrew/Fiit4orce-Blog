# Fit4Force Web Ecosystem

This repository contains the Fit4Force public web experience and the admin dashboard.

## What lives here

- Marketing homepage
- Blog and blog detail pages
- Recruitment updates
- Public preparation tools
- Firebase-backed admin dashboard
- SEO, sitemap, robots, and schema wiring

## Architecture at a glance

- Framework: Next.js 15 App Router with TypeScript and Tailwind CSS
- Data: Firestore collections `posts`, `recruitment_updates`, and `categories`
- Media: local assets served from `public/`
- Admin auth: Firebase Email/Password + custom admin claim
- Public writes: one rate-limited `/api/track-view` endpoint for article views

## Why custom claims for admin roles

Custom claims were chosen over an `admins` collection because Firestore rules can check `request.auth.token.admin` directly. That keeps admin authorization centralized and avoids extra client lookups before every privileged action.

## Important files

- `app/`
  Public site, tools, admin page, sitemap, robots, API routes
- `components/admin/`
  Admin UI and CRUD screens
- `components/content/`
  Blog and updates indexes
- `components/seo/`
  Breadcrumbs, schema, and view tracking
- `lib/`
  Firebase helpers, content layer, sanitization, and admin data functions
- `scripts/bootstrap-admin.mjs`
  One-time first admin bootstrap
- `scripts/seed-firestore.mjs`
  Sample content seed
- `firestore.rules`
  Firestore access control
- `DEPLOYMENT.md`
  Vercel and Firebase deployment guide
- `FIRESTORE_SCHEMA.md`
  Collection fields and required indexes

## Folder structure overview

```text
app/
  admin/
  api/track-view/
  blog/
  tools/
  updates/
components/
  admin/
  content/
  layout/
  seo/
  tools/
  ui/
lib/
scripts/
public/
```

## Local development

1. Install dependencies with `npm install`
2. Copy `.env.local.example` into `.env.local` and fill in Firebase values
3. Run `npm run dev`

## Admin bootstrap

Run this once after the Firebase project is configured:

```bash
npm run bootstrap:admin -- admin@fit4force.com.ng your-secure-password "Fit4Force Admin"
```

Then sign in at `admin.fit4force.com.ng`.

## Blog host

Use `blog.fit4force.com.ng` for the blog subdomain.

## Support contact

Customer support email: `contact.nehemiahtech@gmail.com`

## Media on the free plan

This project is configured to work without Firebase Storage so it stays compatible with the Firebase Spark plan.

- Put reusable images inside `public/`
- Use paths like `/screenshots/dashboard.png` or `/brand/fit4force-logo.png`
- Paste those paths into the admin article form as the featured image
