import { createContentLoader } from 'vitepress'

export interface Pitch {
  title: string
  url: string
  ticker?: string
  order: number
  excerpt: string
}

declare const data: Pitch[]
export { data }

function firstLine(src: string): string {
  return (
    src
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('<')) ?? ''
  )
}

export default createContentLoader('pitches/*.md', {
  transform(raw): Pitch[] {
    return raw
      .map(({ url, frontmatter, src }) => ({
        title: frontmatter.title ?? '',
        url,
        ticker: frontmatter.ticker,
        order: Number(frontmatter.order ?? 999),
        excerpt: firstLine(src ?? ''),
      }))
      .sort((a, b) => a.order - b.order)
  },
})
