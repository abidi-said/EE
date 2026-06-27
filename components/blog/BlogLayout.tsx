import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'

interface BlogLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function BlogLayout({ children, title, description }: BlogLayoutProps) {
  const pageTitle = title
    ? `${title} | Blog | Époxy & Étanchéité`
    : 'Blog | Époxy & Étanchéité'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header variant="inner" />
        <main className="flex-1 pt-32">{children}</main>
        <Footer />
      </div>
    </>
  )
}
