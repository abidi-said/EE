import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const baseUrl = `${protocol}://${host}`
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all search engines to index all content
Disallow:`

  res.setHeader('Content-Type', 'text/plain')
  res.status(200).send(robotsTxt)
}
