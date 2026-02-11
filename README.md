# SO RC

Your comprehensive resource for Yokomo SO news, setups, and technical information.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Blog Posts

Create markdown files in `content/blog/` with frontmatter:

```md
---
title: "Post Title"
date: "2026-02-06"
tag: "News"
excerpt: "Short description"
image: "/images/photo.jpg"
---

Post content here.
```

## Adding Images

Place images in `public/images/`. Reference them as `/images/filename.jpg`.

## Adding Manuals/PDFs

Place PDF files in `public/manuals/`. Update the manuals array in `app/manuals/page.tsx`.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
