import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.resolve(process.cwd(), '../content/posts')
const outputDirectory = path.resolve(process.cwd(), 'import')
const outputFile = path.join(outputDirectory, 'vevnit-articles.ndjson')

function normalizeDate(value) {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  const raw = String(value)
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00.000Z` : new Date(raw).toISOString()
}

const files = (await fs.readdir(postsDirectory)).filter(name => name.endsWith('.md'))
const documents = []
for (const filename of files) {
  const raw = await fs.readFile(path.join(postsDirectory, filename), 'utf8')
  const parsed = matter(raw)
  const data = parsed.data || {}
  if (data.draft === true) continue
  const slug = String(data.slug || filename.replace(/\.md$/, '')).trim()
  if (!slug) continue
  documents.push({
    _id: `vevnit-article-${slug}`,
    _type: 'article',
    title: data.title || slug,
    slug: {current: slug},
    excerpt: data.excerpt || '',
    category: data.category || 'Article',
    author: data.author || 'Makinde',
    publishedAt: normalizeDate(data.date),
    featuredImageUrl: data.featuredImage || '',
    markdownBody: parsed.content.trim(),
    draft: false
  })
}

await fs.mkdir(outputDirectory, {recursive: true})
await fs.writeFile(outputFile, documents.map(doc => JSON.stringify(doc)).join('\n') + (documents.length ? '\n' : ''), 'utf8')
console.log(`Exported ${documents.length} published Markdown articles to ${outputFile}`)
console.log('No source Markdown files were changed or removed.')
