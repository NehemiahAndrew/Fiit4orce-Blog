# Fit4Force Deployment Guide

## Vercel projects and domains

Use three Vercel projects or one shared codebase with host-based routing:

1. `fit4force-web`
  Domain: `fit4force.com.ng`
   Purpose: marketing site, blog, updates, and tools

2. `fit4force-admin`
  Domain: `admin.fit4force.com.ng`
   Purpose: same Next.js codebase, routed through `middleware.ts` to `/admin`

3. `fit4force-app`
  Domain: `app.fit4force.com.ng`
   Purpose: existing Flutter Web deployment

## How the subdomains fit together

- `fit4force.com.ng` serves the public Next.js site.
- `admin.fit4force.com.ng` can point to the same Next.js deployment as `fit4force.com.ng`.
  `middleware.ts` rewrites admin-host requests into the `/admin` route tree.
- `app.fit4force.com.ng` stays owned by the Flutter Web app and is only referenced by this repo.

## Required environment variables

### Public Next.js app

- `NEXT_PUBLIC_FIREBASE_API_KEY`
  Firebase web config key.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  Firebase auth domain for the shared project.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  Shared Firebase project id.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  Firebase web messaging sender id.
- `NEXT_PUBLIC_FIREBASE_APP_ID`
  Firebase web app id.
- `NEXT_PUBLIC_SITE_URL`
  Canonical public domain, usually `https://fit4force.com.ng`.
- `NEXT_PUBLIC_ADMIN_URL`
  Admin domain, usually `https://admin.fit4force.com.ng`.
- `NEXT_PUBLIC_APP_URL`
  Flutter Web app domain, usually `https://app.fit4force.com.ng`.
- `NEXT_PUBLIC_DOWNLOAD_URL`
  Mobile app store link.

### Server-only admin and API routes

- `FIREBASE_PROJECT_ID`
  Admin SDK project id.
- `FIREBASE_CLIENT_EMAIL`
  Admin SDK service account client email.
- `FIREBASE_PRIVATE_KEY`
  Admin SDK private key, with newline escapes preserved.

## Vercel setup steps

1. Import this repo into Vercel.
2. Add the public and server env vars above.
3. Attach `fit4force.com.ng` to the public project.
4. Attach `admin.fit4force.com.ng` to the same project if you want host-based admin routing from one codebase.
5. Attach `app.fit4force.com.ng` to the Flutter Web deployment.
6. Deploy.

## Firebase console steps

1. Enable Email/Password auth.
2. Deploy `firestore.rules`.
3. Create the Firestore indexes listed in `FIRESTORE_SCHEMA.md`.
4. Run the first-admin bootstrap script:

```bash
npm run bootstrap:admin -- admin@fit4force.com.ng your-secure-password "Fit4Force Admin"
```

5. Seed sample content if needed:

```bash
npm run seed:firestore
```

## Support contact

Customer support email: `contact.nehemiahtech@gmail.com`

## Media on Firebase Spark

This codebase can run without Firebase Storage.

- Keep blog and brand images in `public/`
- Reference them with site-relative paths such as `/screenshots/prep.png`
- The admin dashboard exposes those local assets for easy copying
