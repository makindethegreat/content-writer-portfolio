function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]))
}
function safeHref(value) {
  const href = String(value || '').trim()
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(href)) return escapeHtml(href)
  return '#'
}
function renderInline(children = [], markDefs = []) {
  const defs = Object.fromEntries(markDefs.map(def => [def._key, def]))
  return children.map(child => {
    let text = escapeHtml(child.text || '')
    for (const mark of child.marks || []) {
      const def = defs[mark]
      if (def && def._type === 'link') text = `<a href="${safeHref(def.href)}" rel="noopener noreferrer">${text}</a>`
      else if (def && def._type === 'internalArticleLink') {
        const slug = def.articleSlug || def.article?.slug?.current
        text = slug ? `<a href="/blog/${safeHref(slug)}/">${text}</a>` : text
      } else if (mark === 'strong') text = `<strong>${text}</strong>`
      else if (mark === 'em') text = `<em>${text}</em>`
      else if (mark === 'code') text = `<code>${text}</code>`
      else if (mark === 'underline') text = `<u>${text}</u>`
    }
    return text
  }).join('')
}
function renderPortableText(blocks = []) {
  if (!Array.isArray(blocks)) return ''
  const output = []
  let listType = null
  const closeList = () => { if (listType) output.push(`</${listType}>`); listType = null }
  const urlForEmbed = value => {
    try {
      const url = new URL(value)
      if (url.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`
      if (url.hostname.endsWith('youtube.com')) {
        const id = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop()
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
      }
      if (url.hostname.endsWith('vimeo.com')) {
        const id = url.pathname.split('/').filter(Boolean).pop()
        return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
      }
    } catch {}
    return null
  }
  for (const block of blocks) {
    if (block?._type === 'block') {
      const listItem = block.listItem
      if (listItem === 'bullet' || listItem === 'number') {
        const nextType = listItem === 'bullet' ? 'ul' : 'ol'
        if (listType !== nextType) { closeList(); output.push(`<${nextType}>`); listType = nextType }
        output.push(`<li>${renderInline(block.children, block.markDefs)}</li>`)
        continue
      }
      closeList()
      const inner = renderInline(block.children, block.markDefs)
      const style = block.style || 'normal'
      const tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'h4' ? 'h4' : style === 'blockquote' ? 'blockquote' : 'p'
      output.push(`<${tag}>${inner}</${tag}>`)
    } else if (block?._type === 'image') {
      closeList()
      const imageUrl = block.assetUrl
      if (imageUrl && /^https:\/\/cdn\.sanity\.io\/images\//.test(imageUrl)) {
        const alt = escapeHtml(block.alt || '')
        const caption = escapeHtml(block.caption || '')
        output.push(`<figure class="cms-inline-image"><img src="${escapeHtml(imageUrl)}" alt="${alt}" loading="lazy">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`)
      }
    } else if (block?._type === 'callout') {
      closeList()
      const tone = ['note','important','warning'].includes(block.tone) ? block.tone : 'note'
      output.push(`<aside class="cms-callout cms-callout--${tone}">${block.title ? `<strong class="cms-callout-title">${escapeHtml(block.title)}</strong>` : ''}<p>${escapeHtml(block.text || '')}</p></aside>`)
    } else if (block?._type === 'tableBlock') {
      closeList()
      const rows = block.rows || []
      if (rows.length) {
        const header = rows[0].cells || []
        const body = rows.slice(1)
        output.push(`<div class="cms-table-wrap"><table>${block.caption ? `<caption>${escapeHtml(block.caption)}</caption>` : ''}<thead><tr>${header.map(cell=>`<th scope="col">${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${body.map(row=>`<tr>${(row.cells||[]).map(cell=>`<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)
      }
    } else if (block?._type === 'embed') {
      closeList()
      const embedUrl = urlForEmbed(block.url)
      if (embedUrl) output.push(`<figure class="cms-embed"><div class="cms-embed-frame"><iframe src="${embedUrl}" loading="lazy" title="${escapeHtml(block.caption || 'Embedded video')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ''}</figure>`)
      else output.push(`<p class="cms-embed-link"><a href="${safeHref(block.url)}" rel="noopener noreferrer">View embedded content</a></p>`)
    } else if (block?._type === 'ctaBlock') {
      closeList()
      output.push(`<section class="cms-cta">${block.eyebrow ? `<p class="cms-cta-eyebrow">${escapeHtml(block.eyebrow)}</p>` : ''}<h2>${escapeHtml(block.title || '')}</h2>${block.text ? `<p>${escapeHtml(block.text)}</p>` : ''}<a class="cms-cta-button" href="${safeHref(block.buttonUrl)}">${escapeHtml(block.buttonLabel || 'Learn more')}</a></section>`)
    } else if (block?._type === 'codeBlock') {
      closeList()
      const language = escapeHtml(block.language || 'text')
      output.push(`<pre class="cms-code"><code class="language-${language}">${escapeHtml(block.code || '')}</code></pre>`)
    } else closeList()
  }
  closeList()
  return output.join('\n')
}
module.exports = {renderPortableText }
