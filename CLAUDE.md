# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

No test framework is configured.

## Environment

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (from resend.com) for form submissions to work.

## Architecture

Next.js 16 App Router site for the Yokomo SO RC buggy. Dark-themed (`#0A0A0A` bg, `#111` cards), TypeScript throughout.

**Routing** — file-based under `app/`: `/blog/[slug]`, `/setups`, `/tracks`, `/tips`, `/tools`, `/manuals`, `/submit`, `/about`. API routes at `app/api/submit-setup/` and `app/api/submit-track/`.

**Blog content** — markdown files in `content/blog/` with frontmatter (`title`, `date`, `tag`, `excerpt`, `image`). Parsed at request time via `lib/blog.ts` using gray-matter. Slugs are derived from filenames.

**Manuals/PDFs** — PDF files go in `public/manuals/`. The list of entries is hardcoded in `app/manuals/page.tsx` (the `manuals` array).

**Submission forms** — `app/submit/page.tsx` renders `<SubmitForms>` from `components/site/submit-forms.tsx`, which POSTs to the two API routes. Each route applies: in-memory rate limiting (5 req/hr/IP via `lib/rate-limit.ts`), honeypot bot detection (`lib/honeypot.ts`), and Zod schema validation (`lib/validation.ts`), then sends email via Resend.

**Components** split into three groups:
- `components/site/` — page-level components (header, footer, blog-feed, content sections, submit-forms)
- `components/tools/` — interactive client components (gearing-calculator, practice-timer)
- `components/ui/` — Radix UI-based primitives (button, card, input, label, separator, spinner, tabs)

**Custom Tailwind colors**: `yokomo-blue` (`#0066FF`), `racing-yellow` (`#FFCC00`), `racing-red` (`#DC2626`), `slate-grey` (`#6B7280`).

**Path alias**: `@/` maps to the project root (configured in `tsconfig.json`).
