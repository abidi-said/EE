export function getBaseUrl(): string {
  // For client-side
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // For server-side (during build/SSR)
  // This will be overridden by the actual domain when deployed
  return 'https://epoxyetancheite.netlify.app'
}

export function getDynamicBaseUrl(req?: any): string {
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host
    return `${protocol}://${host}`
  }
  
  return getBaseUrl()
}
