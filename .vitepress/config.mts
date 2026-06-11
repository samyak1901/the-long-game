import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))

// Read one frontmatter field from a markdown file (light, dependency-free).
function field(src: string, key: string): string | undefined {
  const fm = src.match(/^---\n([\s\S]*?)\n---/)
  if (!fm) return undefined
  const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return m?.[1].trim().replace(/^['"]|['"]$/g, '')
}

// Build a sidebar group from every .md in a directory, sorted by `order`.
// Adding a new markdown file makes it appear automatically, no config edit.
function group(dir: string): { text: string; link: string; order: number }[] {
  return readdirSync(`${root}/${dir}`)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const src = readFileSync(`${root}/${dir}/${f}`, 'utf8')
      return {
        text: field(src, 'title') ?? f.replace(/\.md$/, ''),
        link: `/${dir}/${f.replace(/\.md$/, '')}`,
        order: Number(field(src, 'order') ?? 999),
      }
    })
    .sort((a, b) => a.order - b.order)
}

export default defineConfig({
  title: 'The Long Game',
  description:
    'Personal notes by Samyak Jain on investing, compounding, football, and long-term decision-making.',
  lang: 'en',
  base: '/the-long-game/',
  cleanUrls: true,
  srcExclude: ['README.md'],
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/the-long-game/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: 'Essays', link: '/essays/' },
      { text: 'Pitches', link: '/pitches/' },
      { text: 'Football', link: '/football/' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/essays/': [{ text: 'Essays', items: group('essays') }],
      '/pitches/': [{ text: 'Stock pitches', items: group('pitches') }],
    },

    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/samyak1901' }],

    docFooter: { prev: 'Previous', next: 'Next' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },

    footer: {
      message: 'Notes on patience, patterns, and compounding.',
      copyright:
        'Nothing here is financial advice, personal notes only. © The Long Game',
    },
  },
})
