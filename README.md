# The Long Game

A personal writing site by Samyak Jain for notes on investing, compounding, stock research, football, and long-term decision-making.

## Content Editing

All written content lives in Markdown files under `src/content/`:

- `src/content/site/` controls homepage sections such as the hero, framework, football note, disclaimer, and footer.
- `src/content/essays/` controls the essay roadmap cards.
- `src/content/pitches/` controls the stock-pitch backlog cards.

The React code handles layout only; edit Markdown files to change wording.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The Vite `base` is set to `/the-long-game/` for GitHub Pages hosting at `https://samyak1901.github.io/the-long-game/`.
