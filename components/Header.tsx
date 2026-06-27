import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  variant?: 'home' | 'inner'
}

const Header = ({ variant = 'home' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(variant === 'inner')
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isInner = variant === 'inner'
  const navScrolled = isScrolled || isInner

  const navigation = [
    { name: t('navigation.home'), href: isInner ? '/#home' : '#home' },
    { name: t('navigation.services'), href: isInner ? '/#services' : '#services' },
    { name: t('navigation.about'), href: isInner ? '/#about' : '#about' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: isInner ? '/#contact' : '#contact' },
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      navScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className="bg-navy-800 text-gold-400 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <FaPhone className="text-xs" />
              <span className="ltr">+216 55 072 043</span>
            </div>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <FaMapMarkerAlt className="text-xs" />
              <span>Tunis, Tunisia</span>
            </div>
          </div>
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-4'}`}>
            <span>{t('common.free_estimates')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className={`transition-all duration-300 ${
        navScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                {/* Logo Image */}
                <img 
                  src="/images/logo/EE-logo.png" 
                  alt="Époxy & Étanchéité Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div className="flex flex-col">
                  <span className={`text-xl font-bold ${navScrolled ? 'text-navy-800' : 'text-white'}`}>Époxy & Étanchéité</span>
                  <span className={`text-xs ${navScrolled ? 'text-gold-600' : 'text-gold-300'}`} style={!navScrolled ? {color: '#eab308'} : {}}>By LaMaison.tn</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              {navigation.map((item) => (
                item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      navScrolled 
                        ? 'text-gray-700 hover:text-navy-800' 
                        : 'text-white hover:text-gold-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      navScrolled 
                        ? 'text-gray-700 hover:text-navy-800' 
                        : 'text-white hover:text-gold-400'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <a
                href="tel:+21655072043"
                className="text-navy-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{backgroundColor: '#eab308'}}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#d4a017'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#eab308'}
              >
                {t('common.get_quote')}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className={navScrolled ? 'text-gray-700' : 'text-white'} />
              ) : (
                <FaBars className={navScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`lg:hidden mt-4 pb-4 ${navScrolled ? 'bg-white' : 'bg-navy-900 bg-opacity-95 backdrop-blur-sm'} rounded-lg`}>
              <div className="flex flex-col space-y-4 p-4">
                {navigation.map((item) => (
                  item.href.startsWith('/') && !item.href.includes('#') ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium transition-colors duration-200 ${
                        navScrolled 
                          ? 'text-navy-800 hover:text-navy-900' 
                          : 'text-white hover:text-gold-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`font-medium transition-colors duration-200 ${
                        navScrolled 
                          ? 'text-navy-800 hover:text-navy-900' 
                          : 'text-white hover:text-gold-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )
                ))}
                    <a
                      href="tel:+21655072043"
                      className="text-navy-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center"
                      style={{backgroundColor: '#eab308'}}
                      onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#d4a017'}
                      onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#eab308'}
                    >
                      {t('common.get_quote')}
                    </a>
                <div className="pt-2">
                  <LanguageSwitcher 
                    textColor={navScrolled ? 'text-navy-800' : 'text-white'}
                    hoverColor={navScrolled ? 'hover:text-navy-900' : 'hover:text-gold-400'}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
