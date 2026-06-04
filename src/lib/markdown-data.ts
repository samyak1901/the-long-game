export type MarkdownDoc = {
  meta: Record<string, string>
  body: string
}

export function parseMarkdown(source: string): MarkdownDoc {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!frontmatter) return { meta: {}, body: source.trim() }

  const meta = Object.fromEntries(
    frontmatter[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(':')
        if (index === -1) return [line, '']
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')
        return [key, value]
      }),
  )

  return { meta, body: frontmatter[2].trim() }
}

export function getExcerpt(body: string): string {
  return body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#') && !line.startsWith('- ')) ?? ''
}
