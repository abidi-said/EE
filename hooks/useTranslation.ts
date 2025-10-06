import { useLanguage } from '../contexts/LanguageContext'
import frTranslations from '../public/locales/fr/common.json'
import arTranslations from '../public/locales/ar/common.json'

const translations = {
  fr: frTranslations,
  ar: arTranslations
}

export const useTranslation = () => {
  const { locale } = useLanguage()
  
  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.')
    let value: any = translations[locale as keyof typeof translations]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to French if key not found
        value = translations.fr
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return the key if not found in fallback either
          }
        }
        break
      }
    }
    
    // If returnObjects is true, return the value as-is (could be array or object)
    if (options?.returnObjects) {
      return value
    }
    
    // Otherwise, return string or key
    return typeof value === 'string' ? value : key
  }
  
  return { t }
}
