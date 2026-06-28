import { GetServerSideProps } from 'next'

const Sitemap = () => null

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const baseUrl = `${protocol}://${host}`

  let posts: { id: number; updated_at: string; created_at: string }[] = []
  try {
    const response = await fetch('https://api.epoxy.tn/api/posts')
    const json = await response.json()
    posts = (json.posts?.data || []).filter((p: any) => p.is_published)
  } catch {}

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr" />
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/blog" />
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/blog" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${posts.map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/blog/${post.id}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/blog/${post.id}" />
    <lastmod>${post.updated_at || post.created_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default Sitemap
