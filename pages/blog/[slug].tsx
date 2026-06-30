import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { FaCalendar, FaArrowLeft, FaTag } from 'react-icons/fa'
import BlogLayout from '../../components/blog/BlogLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { formatDate, getImageUrl, getPost, getPosts, processBody } from '../../lib/api'
import { getBaseUrl } from '../../utils/getBaseUrl'
import type { Post } from '../../types/blog'

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    setBaseUrl(getBaseUrl())
  }, [])

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return
    setLoading(true)
    getPost(slug)
      .then((p) => {
        if (!p.is_published) {
          setError(true)
        } else {
          setPost(p)
        }
      })
      .catch(() => {
        getPosts()
          .then((paginated) => {
            const found = paginated.data.find((p) => p.slug === slug)
            if (found && found.is_published) {
              setPost(found)
            } else {
              setError(true)
            }
          })
          .catch(() => setError(true))
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <BlogLayout>
        <div className="flex justify-center py-32">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </BlogLayout>
    )
  }

  if (error || !post) {
    return (
      <BlogLayout title="Article introuvable">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article introuvable</h1>
          <p className="text-gray-500 mb-8">Cet article n&apos;existe pas ou n&apos;est plus disponible.</p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-navy-900"
            style={{ backgroundColor: '#eab308' }}
          >
            <FaArrowLeft />
            <span>Retour au blog</span>
          </Link>
        </div>
      </BlogLayout>
    )
  }

  const imageUrl = getImageUrl(post.image)
  const body = post.body || ''
  const featuredMatch = body.match(/^<div class="featured-image"><img src="([^"]+)"[^>]*><\/div>/)
  const featuredSrc = featuredMatch?.[1]
  const featuredAlt = featuredMatch?.[2] || post.title
  const cleanBody = featuredMatch ? body.replace(featuredMatch[0], '').replace(/^\n+/, '') : body
  const canonical = baseUrl + router.asPath
  const postTitle = (post.meta_title || post.title) + ' | Époxy & Étanchéité'
  const postDescription = post.meta_description || post.excerpt

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: postDescription,
    ...((featuredSrc || imageUrl) ? { image: featuredSrc || imageUrl! } : {}),
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: 'Époxy & Étanchéité',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Époxy & Étanchéité',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo/EE-logo.png`,
      },
    },
  }

  return (
    <>
      <Head>
        <title>{postTitle}</title>
        <meta name="description" content={postDescription} />
        <meta name="keywords" content={post.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="fr_TN" />
        <meta property="og:site_name" content="Époxy & Étanchéité" />
        {(featuredSrc || imageUrl) && <meta property="og:image" content={featuredSrc || imageUrl!} />}
        {(featuredSrc || imageUrl) && <meta property="og:image:width" content="1200" />}
        {(featuredSrc || imageUrl) && <meta property="og:image:height" content="630" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        <meta name="twitter:description" content={postDescription} />
        {(featuredSrc || imageUrl) && <meta name="twitter:image" content={featuredSrc || imageUrl!} />}
        {baseUrl && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
        )}
      </Head>
      <div className="min-h-screen flex flex-col bg-white">
        <Header variant="inner" />
        <main className="flex-1 pt-32">
          <article className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-gray-500 hover:text-navy-800 transition-colors mb-8"
              >
                <FaArrowLeft />
                <span>Retour au blog</span>
              </Link>

              <header className="mb-10">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendar className="mr-2 text-gold-500" />
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
              </header>

              {(featuredSrc || imageUrl) && (
                <div className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl ring-2 ring-gold-500/20">
                  <div className="relative" style={{ paddingBottom: '45%' }}>
                    <img
                      src={featuredSrc || imageUrl!}
                      alt={featuredAlt || post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: processBody(cleanBody) }}
              />

              {post.keywords && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <FaTag className="text-gold-500 mt-1 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.split(',').map((kw, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-sm"
                        >
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>

          <section className="py-12 bg-navy-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Besoin d&apos;un devis ?</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Contactez-nous pour une estimation gratuite de vos projets d&apos;étanchéité et d&apos;époxy.
              </p>
              <a
                href="tel:+21655072043"
                className="inline-block text-navy-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#eab308' }}
              >
                +216 55 072 043
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const res = await fetch('https://api.epoxy.tn/api/posts')
    const json = await res.json()
    const posts: Post[] = json.posts?.data || []
    const paths = posts
      .filter((p) => p.is_published)
      .map((p) => ({ params: { slug: p.slug } }))
    return { paths, fallback: false }
  } catch {
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps() {
  return { props: {} }
}
