export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

  return (
    <div className="markdown-body">
      {blocks.map((block) => {
        if (block.startsWith('### ')) return <h3 key={block}>{block.slice(4)}</h3>
        if (block.startsWith('## ')) return <h2 key={block}>{block.slice(3)}</h2>
        if (block.startsWith('# ')) return <h1 key={block}>{block.slice(2)}</h1>

        if (block.includes('\n- ')) {
          const [lead, ...items] = block.split('\n')
          return (
            <div key={block}>
              {lead && !lead.startsWith('- ') ? <p>{lead}</p> : null}
              <ul>
                {(lead.startsWith('- ') ? [lead, ...items] : items).map((item) => (
                  <li key={item}>{item.replace(/^-\s*/, '')}</li>
                ))}
              </ul>
            </div>
          )
        }

        if (block.startsWith('- ')) {
          return (
            <ul key={block}>
              {block.split('\n').map((item) => (
                <li key={item}>{item.replace(/^-\s*/, '')}</li>
              ))}
            </ul>
          )
        }

        return <p key={block}>{block}</p>
      })}
    </div>
  )
}
