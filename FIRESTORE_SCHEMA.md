# Fit4Force Firestore Schema

Prompt 3 reads public content from these collections:

## `posts`

Fields:

- `title`: string
- `slug`: string
- `content`: string
- `excerpt`: string
- `featuredImage`: string
- `category`: string
- `tags`: string[]
- `seoTitle`: string
- `seoDescription`: string
- `status`: `"draft" | "published" | "archived"`
- `createdAt`: timestamp
- `updatedAt`: timestamp
- `publishedAt`: timestamp
- `author`: string
- `viewCount`: number

Public pages only read posts where `status == "published"`.

## `recruitment_updates`

Fields:

- `title`: string
- `slug`: string
- `excerpt`: string
- `content`: string
- `category`: string
- `tags`: string[]
- `status`: `"draft" | "published" | "archived"`
- `important`: boolean
- `source`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp
- `publishedAt`: timestamp

Public pages only read updates where `status == "published"`.

## `categories`

Fields:

- `name`: string
- `slug`: string
- `description`: string
- `type`: `"blog" | "update"`
- `createdAt`: timestamp
- `updatedAt`: timestamp

Categories are admin-managed and are not publicly readable in the current ruleset.

## Manual Indexes

Create these composite indexes in Firebase if prompted:

- Collection: `posts`
  - `status` ascending
  - `publishedAt` descending

- Collection: `posts`
  - `status` ascending
  - `slug` ascending

- Collection: `recruitment_updates`
  - `status` ascending
  - `publishedAt` descending

Future admin filters may also need:

- Collection: `posts`
  - `status` ascending
  - `category` ascending
  - `publishedAt` descending

- Collection: `recruitment_updates`
  - `status` ascending
  - `category` ascending
  - `publishedAt` descending
