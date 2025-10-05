import { createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const { locale = 'fr' } = router
  const isRTL = locale === 'ar'

  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale })
  }

  return (
    <LanguageContext.Provider value={{ locale, isRTL, changeLanguage }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}
