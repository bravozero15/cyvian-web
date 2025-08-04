addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Add security headers
    const response = await fetch(request)
    const newHeaders = new Headers(response.headers)
    
    newHeaders.set('X-XSS-Protection', '1; mode=block')
    newHeaders.set('X-Content-Type-Options', 'nosniff')
    newHeaders.set('X-Frame-Options', 'DENY')
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    })
  } catch (err) {
    return new Response('Error loading site', { status: 500 })
  }
}