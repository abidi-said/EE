import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import { getBaseUrl } from '../../utils/getBaseUrl'

interface BlogLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function BlogLayout({ children, title, description }: BlogLayoutProps) {
  const router = useRouter()
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    setBaseUrl(getBaseUrl())
  }, [])

  const canonical = baseUrl + router.asPath
  const pageTitle = title
    ? `${title} | Blog | Époxy & Étanchéité`
    : 'Blog | Époxy & Étanchéité'
  const pageDescription = description || "Actualités, conseils et guides sur l'étanchéité et l'époxy en Tunisie."

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="fr_TN" />
        <meta property="og:site_name" content="Époxy & Étanchéité" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header variant="inner" />
        <main className="flex-1 pt-32">{children}</main>
        <Footer />
      </div>
    </>
  )
}
