# The Long Game

Personal writing by Samyak Jain, investing notes, stock research, and the occasional football thought. Built with [VitePress](https://vitepress.dev).

## Writing a new post

Every page is a plain Markdown file. **Add a file → it's published**: it appears in the sidebar automatically (sorted by the `order` frontmatter field).

- **Essays** live in `essays/`
- **Stock pitches** live in `pitches/`
- **Football** lives in `football/`

### Frontmatter

Essays:

```markdown
---
title: "Why I Started Investing"
category: "Investing"      # shown as a tag on cards
kicker: "Curiosity, ownership, and time"
status: "Drafting"          # optional badge
readTime: "7 min"
order: 1                     # controls sidebar + list order
---

# Why I Started Investing

Your prose here…
```

Pitches:

```markdown
---
title: "MercadoLibre"
ticker: "MELI"
order: 1
---

# MercadoLibre (MELI)

…
```

Markdown is rendered by markdown-it, so tables, code blocks, footnotes, images, and `:emoji:` all work.

## Local development

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build → .vitepress/dist
npm run preview   # preview the production build
```

## Structure

```
.vitepress/
  config.mts              # nav, auto-generated sidebars, search, theme config
  theme/
    index.ts              # extends the default theme, registers components
    custom.css            # plain editorial styling (serif headings, rust accent)
    essays.data.ts        # content loader → essay list
    pitches.data.ts       # content loader → pitch list
    components/           # BlogHome, PostList, PitchList
index.md                  # blog home
essays/  pitches/  football/  about.md
public/                   # static assets (favicon)
```

## Deployment

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
The site is served under the `/the-long-game/` base path.
