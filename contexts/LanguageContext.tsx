import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface LanguageContextType {
  locale: string
  isRTL: boolean
  changeLanguage: (locale: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize with French as default, but check localStorage for saved preference
  const [locale, setLocale] = useState('fr')
  const isRTL = locale === 'ar'

  // Load saved language preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('language') || 'fr'
      setLocale(savedLocale)
    }
  }, [])

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale)
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLocale)
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, isRTL, changeLanguage }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}
