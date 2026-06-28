import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt, FaNewspaper, FaPlus, FaVideo, FaImages, FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

interface AdminLayoutProps {
  children: ReactNode
  title?: string
}

export default function AdminLayout({ children, title = 'Administration' }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, isLoading, logout, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMobileMenuOpen(false)
    if (!isLoading && !isLoggedIn && router.pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [isLoading, isLoggedIn, router.pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isLoggedIn && router.pathname !== '/admin/login') {
    return null
  }

  if (router.pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <>
      <Head>
        <title>{title + ' | Époxy & Étanchéité'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-navy-900 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/admin/posts" className="flex items-center space-x-3">
                  <img src="/images/logo/EE-logo.png" alt="Logo" className="w-9 h-9 object-contain" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-tight text-white">Époxy & Étanchéité</span>
                    <span className="text-[10px] leading-tight" style={{ color: '#eab308' }}>By LaMaison.tn</span>
                  </div>
                </Link>
                <nav className="hidden md:flex items-center space-x-1">
                  <Link
                    href="/admin/posts"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      router.pathname.startsWith('/admin/posts')
                        ? 'bg-navy-800 text-gold-400'
                        : 'text-gray-300 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    <FaNewspaper className="text-xs" />
                    <span>Articles</span>
                  </Link>
                  <Link
                    href="/admin/video"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      router.pathname === '/admin/video'
                        ? 'bg-navy-800 text-gold-400'
                        : 'text-gray-300 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    <FaVideo className="text-xs" />
                    <span>Vidéo</span>
                  </Link>
                  <Link
                    href="/admin/slider"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      router.pathname === '/admin/slider'
                        ? 'bg-navy-800 text-gold-400'
                        : 'text-gray-300 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    <FaImages className="text-xs" />
                    <span>Slider</span>
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 hidden md:block">{user?.name}</span>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                >
                  {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
                <button
                  onClick={() => { logout(); router.push('/admin/login') }}
                  className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-navy-800 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-800 border-t border-navy-700">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link href="/admin/posts" className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${router.pathname.startsWith('/admin/posts') ? 'bg-navy-900 text-gold-400' : 'text-gray-300 hover:text-white hover:bg-navy-900'}`}>
                <FaNewspaper className="text-xs" /><span>Articles</span>
              </Link>
              <Link href="/admin/video" className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${router.pathname === '/admin/video' ? 'bg-navy-900 text-gold-400' : 'text-gray-300 hover:text-white hover:bg-navy-900'}`}>
                <FaVideo className="text-xs" /><span>Vidéo</span>
              </Link>
              <Link href="/admin/slider" className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${router.pathname === '/admin/slider' ? 'bg-navy-900 text-gold-400' : 'text-gray-300 hover:text-white hover:bg-navy-900'}`}>
                <FaImages className="text-xs" /><span>Slider</span>
              </Link>
              <div className="border-t border-navy-700 pt-2 mt-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); router.push('/admin/login') }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-900 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </>
  )
}
