# apenlor.github.io

Personal site — built with [Astro 5](https://astro.build) and the [AstroWind](https://github.com/arthelokyo/astrowind) template. Deployed to [GitHub Pages](https://pages.github.com) via GitHub Actions.

## Stack

- **Framework:** [Astro 5](https://astro.build)
- **Template:** [AstroWind](https://github.com/arthelokyo/astrowind) (Tailwind CSS + TypeScript)
- **Search:** [Pagefind](https://pagefind.app)
- **Deployment:** GitHub Actions → GitHub Pages

## Development

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # preview the production build
npm run check     # TypeScript type checking
npm run fix       # lint fix
```

## Content

| Location | Purpose |
|---|---|
| `src/data/post/` | Blog posts (Markdown, Astro Content Collections) |
| `src/pages/` | Site pages (`index.astro`, `about.astro`, `talks.astro`, `search.astro`) |
| `src/assets/images/` | Images (referenced as `~/assets/images/...`) |
| `src/config.yaml` | Site-wide config (name, URL, blog settings) |
| `src/navigation.ts` | Header and footer navigation |

## Key conventions

- `publishDate` in post frontmatter must be an **unquoted** YAML date: `2024-12-19T00:00:00Z`
- Post images use the `~/assets/images/` alias
- `category` is a single string (not an array)
- See `AGENTS.md` for full agent/contributor guidelines
