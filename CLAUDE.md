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

## Lessons Learned

**Never use shadcn Tabs for interactive tab UIs.** The `TabsTrigger` component in `components/ui/tabs.tsx` has default active-state classes (`data-[state=active]:bg-background`, `data-[state=active]:text-foreground`, `data-[state=active]:shadow-sm`) that cannot be reliably overridden via `className` because `twMerge` does not always resolve conflicts with shadcn CSS variable-based utilities. Use plain HTML instead: a `div` with `flex` for the tab bar, `<button type="button">` for each tab toggling a `useState` value, and `{tab === 'x' && <div>...</div>}` for conditional panel rendering.

**Always read the design reference component before building UI.** For this project, `components/tools/gearing-calculator.tsx` is the canonical style reference. Match its card class (`rounded-lg border border-white/10 bg-[#111] p-6`), label class (`mb-1 block text-sm text-gray-400`), and input class (`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-yokomo-blue focus:outline-none`) exactly.

**Style constants must be verified against the design reference before use.** Do not derive style constants from memory or assumption — read the reference file and copy classes directly.

**Never leave new form components uncommitted.** Commit `components/notebook/setup-form.tsx` immediately after it first renders correctly, before any iterative styling changes.

## Prompt Efficiency Rules
- Always combine related changes into a single task. Never make one small change at a time when multiple related changes are needed.
- Before making any UI change, read the relevant component files first. Never guess at class names or structure.
- When fixing a bug, identify the root cause before touching any code. Do not make speculative edits.
- Never leave components uncommitted after they first render correctly.
- When adding a nav item, always handle: correct label, correct href, correct visibility conditions (logged in/out), mobile menu — all in one pass.
- When building a form, always read the data model doc AND a reference component before writing any code.
- Do not ask clarifying questions mid-task. Make reasonable decisions and document them.

## Common Mistakes to Avoid
- Do not use shadcn Tabs — use plain HTML buttons with useState
- Do not stretch full-width on inputs without checking the grid layout first
- Do not commit with "nothing to commit" errors — check git status first
- Do not run dev server if one is already running — check with lsof -i :3000 first
