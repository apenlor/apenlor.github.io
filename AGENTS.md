# Agent Directives for Astro / AstroWind Repository

This `AGENTS.md` provides context, commands, and coding standards for autonomous coding agents
operating in this repository. Read it fully before making any change.

This site is built with **Astro 6**, the **AstroWind** template, **Tailwind CSS v4**, and
**TypeScript**. It is deployed to **GitHub Pages** on every push to `main`.

---

## 1. Project Overview & Architecture

- **Static Site Generator:** Astro 6.x (`output: "static"`)
- **Template:** AstroWind (Tailwind CSS v4, TypeScript)
- **Primary Languages:** TypeScript, Astro components (`.astro`), Markdown / MDX, YAML
- **Hosting / Deployment:** GitHub Pages — `main` branch triggers `.github/workflows/deploy.yml`
- **Icons:** `astro-icon` with `@iconify-json/tabler` (all tabler icons) and a subset of `flat-color-icons`
- **Node version:** `>=22.12.0` (enforced in `package.json`)

### Key directory structure

```
src/
  config.yaml          — Site-wide config (name, URL, blog settings, analytics)
  navigation.ts        — Header & footer navigation links
  content.config.ts    — Content collection schema (Astro Content Layer API)
  pages/               — Astro pages (index.astro, about.astro, talks.astro, …)
  data/post/           — Blog posts as Markdown / MDX (Content Collection)
  assets/images/       — All images (referenced via ~/assets/images/…)
  components/
    widgets/           — AstroWind widget components (Hero, Steps, BlogLatestPosts, …)
    ui/                — Low-level UI primitives (Button, ItemGrid, WidgetWrapper, …)
    blog/              — Blog list/grid/item components
    common/            — Shared utilities (Image, Favicons, Logo, …)
  layouts/             — PageLayout.astro wraps every page
  types.d.ts           — Global TypeScript type definitions
  utils/               — Permalink helpers, frontmatter remark/rehype plugins
astro.config.ts        — Astro config (integrations, image domains, markdown plugins, Vite alias)
tailwind.config.js     — Tailwind theme extensions (custom colors via CSS vars, fonts, animations)
eslint.config.js       — Flat ESLint config (astro + typescript-eslint)
.github/workflows/
  deploy.yml           — CI/CD: build → upload → deploy to GitHub Pages
```

---

## 2. Build, Lint, and Check Commands

There are **no automated tests** in this project. Validation is done via type checking, linting,
and a production build.

```bash
# Development server (hot reload) at http://localhost:4321
npm run dev

# Production build into dist/
npm run build

# Preview the production build locally
npm run preview

# Run ALL checks (Astro type check + ESLint + Prettier)
npm run check

# Individual checks — run these to isolate failures
npm run check:astro      # astro check — TypeScript diagnostics for .astro files
npm run check:eslint     # eslint .
npm run check:prettier   # prettier --check .

# Auto-fix lint and formatting issues
npm run fix              # runs fix:eslint then fix:prettier
npm run fix:eslint       # eslint --fix .
npm run fix:prettier     # prettier -w .
```

**Primary validation gate:** `npm run check && npm run build` must complete with **zero errors**.
Always run this after any structural change (frontmatter, config, new pages, component edits).

---

## 3. Code Style & Formatting

### General

- **Indentation:** 2 spaces. No tabs anywhere.
- **Quotes:** Double quotes in TypeScript / `.astro` frontmatter (`"value"`). Prettier enforces this.
- **Trailing commas:** Prettier default (ES5 — trailing commas in multi-line structures).
- **Line length:** Prettier default (80 chars). Do not force-wrap already-short lines.
- **Semicolons:** Yes (Prettier default).
- Run `npm run fix` after bulk edits to auto-correct formatting before committing.

### Imports

- Use the `~` path alias for all `src/` imports: `import Foo from '~/components/ui/Foo.astro'`.
- Never use relative `../` paths to cross component boundaries; use `~/` instead.
- In `.astro` files, keep all imports inside the frontmatter fence (`---`).
- Import order (enforced by ESLint/Prettier): external packages first, then `~/` aliases.

### TypeScript

- All logic in `.astro` frontmatter must be TypeScript.
- Prefer explicit types for exported interfaces and props. Avoid `any`.
- Use `type` imports where a value is only needed at the type level: `import type { Widget } from '~/types'`.
- Unused variables prefixed with `_` are allowed (`argsIgnorePattern: "^_"`).
- Non-null assertions (`!`) are permitted but prefer optional chaining (`?.`) where possible.
- Global types live in `src/types.d.ts`. Do not duplicate type definitions inline.

### Astro Components

- Every page must use `PageLayout.astro` as its base layout.
- Prefer AstroWind widgets (`~/components/widgets/`) over custom markup. Only write custom markup
  when a widget's structure would require awkward workarounds.
- When writing custom sections, wrap them in `<WidgetWrapper>` to get consistent padding,
  dark-mode background, and intersection animations. `WidgetWrapper` accepts: `id`, `isDark`, `bg`,
  `containerClass`, `as`.
- Use `<Icon name="tabler:…" />` from `astro-icon/components` for all icons. Do not use inline SVG.
- Use `<Image>` from `~/components/common/Image.astro` (not `astro:assets` directly) for
  optimized images.
- Component props must be typed via `export interface Props` or by importing from `~/types.d.ts`.
- Do not add `isAfterContent` (or other widget-specific props) to `WidgetWrapper` — it does not
  accept them. Check `src/types.d.ts` and the component's own `Props` interface before passing props.

### Key types (from `src/types.d.ts`)

Always import from `~/types` rather than re-declaring inline:

- **`CallToAction`** — `{ variant?: "primary"|"secondary"|"tertiary"|"link"; text?: string; href?: string; icon?: string; target?: string; }`
- **`Widget`** — base for all widgets: `{ id?: string; isDark?: boolean; bg?: string; classes?: Record<string, …> }`
- **`Item`** — used by `ItemGrid`, `Steps`, etc.: `{ title?, description?, icon?, callToAction?, image? }`
- **`MetaData`** — page SEO object passed to `PageLayout`: `{ title?, description?, robots?, openGraph?, twitter? }`

### Hero widget constraint

`Hero` renders `subtitle` via `<p set:html={subtitle} />`. **Never pass block-level HTML
(`<div>`, `<section>`, etc.) in the `subtitle` prop** — the browser will auto-close the `<p>` and
produce broken markup. Use the `<Fragment slot="subtitle">` named slot for rich subtitle content
instead.

### CSS / Tailwind

- Use Tailwind utility classes exclusively. Do not write custom CSS unless absolutely necessary.
- Custom semantic colors are CSS-variable-backed tokens defined in `tailwind.config.js`:
  `primary`, `secondary`, `accent`, `default`, `muted`. Prefer these over raw color utilities.
- Dark mode is class-based (`dark:`). Always provide dark-mode variants for text and backgrounds.
- Use `group` / `group-hover:` for interactive hover states on compound elements (e.g., card links).
- `font-heading` applies the heading font family. Use it on `<h1>`–`<h3>` elements.
- Avoid one-off magic numbers in inline styles; use Tailwind's spacing / sizing scale instead.

---

## 4. Content Guidelines

### Blog Posts (`src/data/post/*.md` or `*.mdx`)

- **Filename:** `kebab-case.md` — no date prefix; date lives in frontmatter.
- **Required frontmatter:**
  ```yaml
  publishDate: 2024-12-19T00:00:00Z # unquoted — YAML native date, NOT a string
  title: "Post title"
  excerpt: "One-sentence description shown in listings"
  image: ~/assets/images/teaser-image.png
  category: Contract Testing # single string, not an array
  tags:
    - Tag1
    - Tag2
  ```
- **`publishDate` must be unquoted.** Quoted ISO strings fail `z.date()` schema validation.
- **`image`** must use the `~/assets/images/…` alias. No external URLs (Unsplash, etc.). The
  schema stores it as a plain string (`z.string()`), not `ImageMetadata` — the alias is resolved
  at build time by the image optimization pipeline.
- **Headers:** Start body content with `##` (H2). H1 is rendered from the `title` frontmatter field.
- `draft: true` hides a post from listings without deleting it.

### Pages (`src/pages/*.astro`)

- No demo or placeholder content. All content must be real and purposeful.
- External links in body text use `target="_blank"` and include `rel="noopener noreferrer"` (or
  rely on the `Button` component which sets these automatically when `target` is provided).

### Accessibility

- All `<a target="_blank">` elements must have `rel="noopener noreferrer"`.
- Icon-only interactive elements must have an `aria-label`.
- `<Image>` components must have a descriptive `alt` attribute. Never use `alt=""` for meaningful images.

---

## 5. Component & Data Patterns

### Adding navigation items

Edit `src/navigation.ts` — `headerData.links` for the top nav, `footerData.socialLinks` for footer icons.

### Adding a new page

1. Create `src/pages/my-page.astro` using `PageLayout.astro`.
2. Add a `const metadata = { title: '…', description: '…' }` object and pass it to the layout.
3. Add a nav link in `src/navigation.ts` if the page should appear in the header.
4. Run `npm run check && npm run build` to verify.

### ItemGrid

`ItemGrid` renders a responsive grid of items with optional icons, titles, descriptions, and a
`callToAction` (renders a `Button`). Use the `columns` prop (2, 3, or 4) and `classes` to
customise layout. For fully custom card interactions (e.g., entire card as a link), write
custom markup instead of relying on `callToAction` — see the certifications section in
`src/pages/about.astro` for the established pattern.

### BlogLatestPosts

Accepts a `layout` prop (`'grid'` | `'list'`, default `'grid'`) and a `count` prop. The home
page uses `layout="list" count={3}`.

### Image Loading & Performance (`eagerCount`)

To optimize Largest Contentful Paint (LCP) and avoid above-the-fold lazy-loading penalties, list components (`Grid`, `List`, `BlogLatestPosts`) use an `eagerCount` prop:

- **Default behavior:** `eagerCount` defaults to `4`. The first 4 items receive `loading="eager"`, but **only the first item** receives `fetchpriority="high"` to prevent bandwidth contention.
- **Below-the-fold override:** When rendering lists strictly below the fold (e.g., `BlogHighlightedPosts` at the bottom of an article), you **must** pass `eagerCount={0}` to disable eager loading.
- **Vertical lists:** For vertical lists (like on the landing page) where items quickly fall below the fold, override the default to match visible items (e.g., `eagerCount={3}`).

---

## 6. Agent Workflow

1. **Understand before modifying.** Read `src/config.yaml`, `src/navigation.ts`, and the relevant
   page/component before making changes.
2. **Validate every change.** Run `npm run check && npm run build` after any structural edit.
3. **No new dependencies** without explicit user approval.
4. **No demo content.** Do not add AstroWind placeholder posts or lorem ipsum.
5. **`src/config.yaml` is authoritative site config.** Do not invent new top-level keys — only
   edit existing fields (e.g., `site.name`, `metadata.description`, `apps.blog.postsPerPage`).
6. **Branch discipline.** Do not push directly to `main`. Use `feat/` branches for development work.
7. **Commits.** Follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`).
   Never commit unless the user explicitly requests it.
8. **`plan/` directory** is git-ignored and must never be committed.
