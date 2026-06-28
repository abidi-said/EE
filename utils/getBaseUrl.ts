export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  return ''
}

export function getDynamicBaseUrl(req?: any): string {
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host
    return `${protocol}://${host}`
  }
  
  return getBaseUrl()
}
