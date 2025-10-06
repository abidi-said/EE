import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'
import { FaGlobe } from 'react-icons/fa'

interface LanguageSwitcherProps {
  textColor?: string
  hoverColor?: string
}

const LanguageSwitcher = ({ textColor = 'text-white', hoverColor = 'hover:text-primary-200' }: LanguageSwitcherProps) => {
  const { locale, changeLanguage, isRTL } = useLanguage()
  const { t } = useTranslation()

  const languages = [
    { code: 'fr', name: t('common.languages.french'), flag: '🇫🇷' },
    { code: 'ar', name: t('common.languages.arabic'), flag: '🇹🇳' }
  ]

  return (
    <div className="relative group">
      <button className={`flex items-center space-x-2 ${textColor} ${hoverColor} transition-colors duration-200`}>
        <FaGlobe className="text-sm" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === locale)?.flag} {languages.find(lang => lang.code === locale)?.name}
        </span>
      </button>
      
      <div className={`absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
              isRTL ? 'text-right' : 'text-left'
            } ${
              locale === language.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
            }`}
          >
            <span className={isRTL ? 'ml-3' : 'mr-3'}>{language.flag}</span>
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
