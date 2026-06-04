import { Markdown } from './lib/markdown'
import { getExcerpt, parseMarkdown } from './lib/markdown-data'

type ContentCard = {
  body: string
  meta: Record<string, string>
}

const siteDocs = import.meta.glob('./content/site/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const essayDocs = import.meta.glob('./content/essays/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const pitchDocs = import.meta.glob('./content/pitches/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadSiteDoc(name: string) {
  return parseMarkdown(siteDocs[`./content/site/${name}.md`])
}

function loadCollection(docs: Record<string, string>): ContentCard[] {
  return Object.values(docs)
    .map(parseMarkdown)
    .sort((a, b) => Number(a.meta.order ?? 0) - Number(b.meta.order ?? 0))
}

const hero = loadSiteDoc('hero')
const themes = loadSiteDoc('themes')
const essayRoadmap = loadSiteDoc('essay-roadmap')
const framework = loadSiteDoc('framework')
const pitchesIntro = loadSiteDoc('pitches')
const football = loadSiteDoc('football')
const disclaimer = loadSiteDoc('disclaimer')
const footer = loadSiteDoc('footer')
const essays = loadCollection(essayDocs)
const pitches = loadCollection(pitchDocs)
const featuredEssay = essays[0]
const otherEssays = essays.slice(1)

function titleFromMarkdown(body: string) {
  return body.match(/^#\s+(.+)$/m)?.[1] ?? ''
}

function bodyWithoutTitle(body: string) {
  return body.replace(/^#\s+.+\n?/, '').trim()
}

function ThemeList() {
  const blocks = themes.body.split(/\n(?=##\s)/).filter(Boolean)

  return (
    <section className="theme-list" aria-label={themes.meta.title}>
      {blocks.map((block, index) => {
        const title = block.match(/^##\s+(.+)$/m)?.[1] ?? ''
        const copy = block.replace(/^##\s+.+\n?/, '').trim()

        return (
          <article className="theme-row" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{title}</h2>
              <Markdown source={copy} />
            </div>
          </article>
        )
      })}
    </section>
  )
}

function App() {
  return (
    <>
      <header className="site-header" aria-label="Site navigation">
        <a className="brand" href="#top" aria-label="The Long Game home">
          The Long Game
        </a>
        <nav>
          <a href="#essays">Essays</a>
          <a href="#pitches">Pitches</a>
          <a href="#pitch-notes">Notes</a>
          <a href="#football">Football</a>
          <a href="https://github.com/samyak1901" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{hero.meta.eyebrow}</div>
              <h1>{titleFromMarkdown(hero.body)}</h1>
            </div>
            <div className="hero-aside">
              <div className="hero-copy">
                <Markdown source={bodyWithoutTitle(hero.body)} />
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#essays">{hero.meta.primaryAction}</a>
                <a className="button secondary" href="#pitch-notes">Read pitch notes</a>
              </div>
            </div>
          </div>
        </section>

        <ThemeList />

        <section id="essays" className="section-shell">
          <div className="section-heading wide-heading">
            <div>
              <p>{essayRoadmap.meta.label}</p>
              <h2>{essayRoadmap.meta.title}</h2>
            </div>
            <Markdown source={essayRoadmap.body} />
          </div>
          <div className="essay-layout">
            {featuredEssay ? (
              <article className="featured-essay">
                <div className="meta-line">
                  <span>{featuredEssay.meta.category}</span>
                  <span>{featuredEssay.meta.readTime}</span>
                  <span>{featuredEssay.meta.status}</span>
                </div>
                <p className="kicker">{featuredEssay.meta.kicker}</p>
                <h3>{featuredEssay.meta.title}</h3>
                <p>{getExcerpt(featuredEssay.body)}</p>
              </article>
            ) : null}
            <div className="essay-index">
              {otherEssays.map((essay) => (
                <article className="essay-row" key={essay.meta.title}>
                  <div className="meta-line">
                    <span>{essay.meta.category}</span>
                    <span>{essay.meta.readTime}</span>
                  </div>
                  <h3>{essay.meta.title}</h3>
                  <p>{getExcerpt(essay.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="framework" className="framework-section section-shell">
          <div>
            <p className="section-label">{framework.meta.label}</p>
            <h2>{framework.meta.title}</h2>
          </div>
          <div className="principle-list">
            <Markdown source={framework.body} />
          </div>
        </section>

        <section id="pitches" className="section-shell pitch-index-section">
          <div className="section-heading wide-heading">
            <div>
              <p>{pitchesIntro.meta.label}</p>
              <h2>{pitchesIntro.meta.title}</h2>
            </div>
            <Markdown source={pitchesIntro.body} />
          </div>
          <div className="pitch-table">
            {pitches.map((pitch) => (
              <a className="pitch-table-row" href={`#pitch-${pitch.meta.ticker?.toLowerCase()}`} key={pitch.meta.ticker}>
                <span>{pitch.meta.ticker}</span>
                <strong>{pitch.meta.title}</strong>
                <p>{getExcerpt(pitch.body)}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="pitch-notes" className="section-shell">
          <div className="section-heading wide-heading">
            <div>
            <p>Full pitch notes</p>
              <h2>Company notes, written like a research notebook.</h2>
            </div>
            <span>Each note is stored as editable Markdown in <code>src/content/pitches</code>. The writing can stay rough while the structure makes it readable.</span>
          </div>
          <div className="pitch-articles">
            {pitches.map((pitch) => (
              <article id={`pitch-${pitch.meta.ticker?.toLowerCase()}`} className="pitch-article" key={`${pitch.meta.ticker}-article`}>
                <div className="pitch-label">
                  <span>{pitch.meta.title}</span>
                  <strong>{pitch.meta.ticker}</strong>
                </div>
                <Markdown source={pitch.body} />
              </article>
            ))}
          </div>
        </section>

        <section id="football" className="football-section">
          <p className="section-label">{football.meta.label}</p>
          <h2>{football.meta.title}</h2>
          <Markdown source={football.body} />
        </section>

        <section className="disclaimer" aria-label="Investment disclaimer">
          <h2>{disclaimer.meta.title}</h2>
          <Markdown source={disclaimer.body} />
        </section>
      </main>

      <footer>
        <p>{footer.meta.title}</p>
        <Markdown source={footer.body} />
      </footer>
    </>
  )
}

export default App
