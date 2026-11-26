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
      if (def && def._type === 'link') {
        text = `<a href="${safeHref(def.href)}" rel="noopener noreferrer">${text}</a>`
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
  const closeList = () => {
    if (listType) output.push(`</${listType}>`)
    listType = null
  }

  for (const block of blocks) {
    if (block?._type === 'block') {
      const listItem = block.listItem
      if (listItem === 'bullet' || listItem === 'number') {
        const nextType = listItem === 'bullet' ? 'ul' : 'ol'
        if (listType !== nextType) {
          closeList()
          output.push(`<${nextType}>`)
          listType = nextType
        }
        output.push(`<li>${renderInline(block.children, block.markDefs)}</li>`)
        continue
      }
      closeList()
      const inner = renderInline(block.children, block.markDefs)
      const style = block.style || 'normal'
      const tag = style === 'h1' ? 'h2' : style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'h4' ? 'h4' : style === 'blockquote' ? 'blockquote' : 'p'
      output.push(`<${tag}>${inner}</${tag}>`)
    } else if (block?._type === 'image') {
      closeList()
      const imageUrl = block.assetUrl
      if (imageUrl && /^https:\/\/cdn\.sanity\.io\/images\//.test(imageUrl)) {
        const alt = escapeHtml(block.alt || '')
        output.push(`<figure><img src="${escapeHtml(imageUrl)}" alt="${alt}" loading="lazy">${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`)
      }
    } else {
      closeList()
    }
  }
  closeList()
  return output.join('\n')
}

module.exports = {renderPortableText}
