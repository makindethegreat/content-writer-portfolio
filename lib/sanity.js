const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ae69pj79'
const DATASET = process.env.SANITY_DATASET || 'production'
const API_VERSION = '2025-01-01'

const query = `{
  "articles": *[_type == "article" && draft != true && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, publishedAt, category, author,
    seoTitle, seoDescription, canonicalUrl, markdownBody, featuredImageUrl,
    "coverImageUrl": coverImage.asset->url, "coverImageAlt": coverImage.alt,
    body[]{..., "assetUrl": asset->url, markDefs[]{..., "articleSlug": article->slug.current}}
  },
  "caseStudies": *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, client, summary, category, challenge, objectives, approach, results, evidence, featured,
    "coverImageUrl": coverImage.asset->url, publishedAt, seoTitle, seoDescription
  },
  "research": *[_type == "research" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, summary, researchQuestion, hypothesis, methodology, sample, findings, limitations, sources, featured, publishedAt
  },
  "services": *[_type == "service"] | order(sortOrder asc) {
    _id, title, "slug": slug.current, summary, description, problemsSolved, deliverables, process, ctaLabel, ctaUrl, sortOrder
  },
  "resources": *[_type == "resource"] | order(dateAdded desc) {
    _id, title, url, description, resourceType, topic, featured, dateAdded
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    siteName, siteDescription, homepageHeadline, homepageSubheadline, profileName, profileBio, profileImage, email, linkedin, x, ctaLabel, ctaUrl, seoTitle, seoDescription
  }
}`

let requestCache

async function fetchSanityData() {
  if (requestCache) return requestCache
  requestCache = (async () => {
    const empty = {articles: [], caseStudies: [], research: [], services: [], resources: [], siteSettings: null, connected: false}
    if (!PROJECT_ID || !DATASET) return empty
    const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
    try {
      const response = await fetch(endpoint, {headers: {Accept: 'application/json'}})
      if (!response.ok) throw new Error(`Sanity returned HTTP ${response.status}`)
      const payload = await response.json()
      return {...empty, ...(payload.result || {}), connected: true}
    } catch (error) {
      console.warn(`[Sanity] Content fetch skipped: ${error.message}. Local Markdown content remains available.`)
      return empty
    }
  })()
  return requestCache
}

module.exports = {fetchSanityData}
