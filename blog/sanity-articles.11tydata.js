module.exports = {
  eleventyComputed: {
    title: data => data.article.title,
    excerpt: data => data.article.excerpt || '',
    date: data => data.article.publishedAt || new Date(),
    category: data => data.article.category || 'Article',
    author: data => data.article.author || 'Makinde',
    featuredImage: data => data.article.coverImageUrl || data.article.featuredImageUrl || '',
    featuredImageAlt: data => data.article.coverImageAlt || (data.article.title + ' featured image'),
    seoTitle: data => data.article.seoTitle || '',
    seoDescription: data => data.article.seoDescription || '',
    canonicalUrl: data => data.article.canonicalUrl || '',
    permalink: data => `/blog/${data.article.slug}/index.html`,
    readTime: data => {
      const text = data.article.markdownBody || (data.article.body || []).flatMap(block => block.children || []).map(child => child.text || '').join(' ')
      const words = text.trim().split(/\s+/).filter(Boolean).length
      return words ? `${Math.max(1, Math.ceil(words / 220))} min read` : ''
    }
  }
}
