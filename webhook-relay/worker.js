function hex(buffer) {
  return [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, '0')).join('')
}
async function verifySignature(body, signature, secret) {
  if (!signature || !secret) return false
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign'])
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
  const expected = hex(digest)
  const supplied = signature.replace(/^sha256=/i, '').trim().toLowerCase()
  if (expected.length !== supplied.length) return false
  let mismatch = 0
  for (let i=0;i<expected.length;i++) mismatch |= expected.charCodeAt(i) ^ supplied.charCodeAt(i)
  return mismatch === 0
}
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed', {status:405})
    const body = await request.text()
    const signature = request.headers.get('x-sanity-webhook-signature')
    if (!await verifySignature(body, signature, env.SANITY_WEBHOOK_SECRET)) return new Response('Unauthorized', {status:401})
    let payload
    try { payload = JSON.parse(body) } catch { return new Response('Invalid JSON', {status:400}) }
    const id = payload._id || payload.documentId || payload.id
    if (payload._type && payload._type !== 'article') return new Response('Ignored non-article', {status:200})
    if (!id || String(id).startsWith('drafts.')) return new Response('Ignored draft or missing ID', {status:200})
    const response = await fetch('https://api.github.com/repos/makindethegreat/content-writer-portfolio/dispatches', {
      method:'POST',
      headers:{
        'Authorization':`Bearer ${env.GITHUB_TOKEN}`,
        'Accept':'application/vnd.github+json',
        'X-GitHub-Api-Version':'2022-11-28',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({event_type:'sanity-publish',client_payload:{documentId:id}})
    })
    if (!response.ok) return new Response('GitHub dispatch failed', {status:502})
    return new Response('Deployment requested', {status:202})
  }
}
