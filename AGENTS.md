# Agent Directives for Astro / AstroWind Repository

This `AGENTS.md` provides crucial context, operational commands, and coding standards for autonomous coding agents operating within this repository.

This repository is a static site built with **Astro 5** and the **AstroWind** template. It is deployed to **GitHub Pages** via GitHub Actions.

---

## 1. Project Overview & Architecture

- **Static Site Generator:** Astro 5.x
- **Template:** AstroWind (Tailwind CSS, TypeScript)
- **Primary Languages:** TypeScript, Astro components, Markdown, YAML.
- **Hosting / Deployment:** GitHub Pages (branch: `main` triggers deploy).
- **Search:** Pagefind (indexed at build time, served from `dist/pagefind/`).

### Key directory structure

```
src/
  config.yaml          — Site-wide config (name, URL, blog settings, analytics)
  navigation.ts        — Header and footer navigation links
  pages/               — Astro pages (index.astro, about.astro, talks.astro, search.astro, ...)
  data/post/           — Blog posts as Markdown (Astro Content Collection)
  assets/images/       — All images (referenced as ~/assets/images/...)
  components/widgets/  — AstroWind widget components (Hero, Content, BlogLatestPosts, ...)
  content/config.ts    — Content collection schema (post schema with publishDate, title, etc.)
  layouts/             — Page layouts (PageLayout.astro wraps all pages)
astro.config.ts        — Astro config (site, output, integrations including Pagefind)
.github/workflows/deploy.yml — CI/CD: builds and deploys to GitHub Pages on push to main
plan/                  — Migration plan (git-ignored, do not commit)
```

---

## 2. Build, Run, and Test Commands

```bash
# Development server (hot reload) at http://localhost:4321
npm run dev

# Production build into dist/
npm run build

# Preview the production build locally
npm run preview

# TypeScript type checking
npm run check

# Lint fix
npm run fix
```

**Primary validation:** `npm run build` must complete with zero errors. Always run this after any structural changes.

---

## 3. Code Style & Architecture Guidelines

### Blog Posts (`src/data/post/*.md`)

- **Filename:** `kebab-case.md` — no date prefix (date is in frontmatter).
- **Required frontmatter:**
  ```yaml
  publishDate: 2024-12-19T00:00:00Z # YAML native date — NO quotes
  title: "Post title"
  excerpt: "Short description"
  image: ~/assets/images/teaser-image.png
  category: Contract Testing # single string
  tags:
    - Tag1
    - Tag2
  ```
- **`publishDate` must be unquoted** so YAML parses it as a native date. Quoted ISO strings will fail the content collection schema validation (`z.date()`).
- **Images** must use the `~/assets/images/...` path alias (not `/assets/images/...`).
- **Headers:** Start content with `##` (H2); H1 is rendered from `title` frontmatter.

### Pages (`src/pages/*.astro`)

- Use `PageLayout.astro` as the base layout.
- Use AstroWind widgets (`Hero`, `Content`, `BlogLatestPosts`, `CallToAction`, `HeroText`, etc.) from `~/components/widgets/`.
- Do not use external images (Unsplash URLs) — prefer local assets in `src/assets/images/`.

### Configuration (`src/config.yaml`)

- YAML with 2-space indentation. No tabs.
- `apps.blog.post.permalink` is set to `/blog/%slug%`.

### TypeScript / Astro

- Prefer TypeScript for any logic in `.astro` frontmatter.
- Follow existing patterns in `src/navigation.ts` for adding nav items.

### CSS

- Use Tailwind CSS utility classes. Do not write custom CSS unless strictly necessary.
- Follow BEM naming if custom classes are added.

---

## 4. Content Collection Schema

Defined in `src/content/config.ts`. Key constraint:

- `publishDate` is `z.date().optional()` — YAML must supply a native date (unquoted ISO 8601).
- `category` is a single string, not an array.
- `image` path uses the `~/assets/images/` alias.

---

## 5. Agent Workflow Expectations

1. **Understand before modifying:** Read `src/config.yaml`, `src/navigation.ts`, and the relevant page before making changes.
2. **Validate every change:** Run `npm run build` after any structural change (frontmatter, config, new pages).
3. **No demo content:** Do not add AstroWind demo posts or placeholder content. All content must be real.
4. **Search:** Pagefind is integrated. It indexes automatically at build time — no manual intervention needed.
5. **Deployment:** Push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`. Do not push directly to `main` for development work; use `feat/` branches.
6. **Migration plan:** `plan/migration.md` is git-ignored and authoritative. Do not commit the `plan/` directory.
