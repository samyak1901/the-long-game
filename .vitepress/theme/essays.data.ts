import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  category?: string
  kicker?: string
  status?: string
  readTime?: string
  order: number
  excerpt: string
}

declare const data: Post[]
export { data }

// First real prose line of the body, for use as a card excerpt.
function firstLine(src: string): string {
  return (
    src
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('<')) ?? ''
  )
}

export default createContentLoader('essays/*.md', {
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, src }) => ({
        title: frontmatter.title ?? '',
        url,
        category: frontmatter.category,
        kicker: frontmatter.kicker,
        status: frontmatter.status,
        readTime: frontmatter.readTime,
        order: Number(frontmatter.order ?? 999),
        excerpt: firstLine(src ?? ''),
      }))
      .sort((a, b) => a.order - b.order)
  },
})
