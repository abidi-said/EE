import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const quickLinks = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.services'), href: '#services' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.contact'), href: '#contact' }
  ]

  const services = [
    t('services.residential.title'),
    t('services.commercial.title'),
    t('services.epoxy.title'),
    t('services.warehouse.title'),
    t('services.protective.title'),
    t('services.maintenance.title')
  ]

  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=61576714255009', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className={`grid lg:grid-cols-4 md:grid-cols-2 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Company Info */}
          <div className="space-y-6" style={isRTL ? {textAlign: 'right', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'} : {}}>
            <div className="flex items-center" style={isRTL ? {justifyContent: 'flex-end', width: '100%'} : {}}>
              <a 
                href="/" 
                className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200"
                style={isRTL ? {flexDirection: 'row', justifyContent: 'flex-end', gap: '20px'} : {}}
              >
                {/* Logo Image */}
                <img 
                  src="/images/logo/EE-logo.png" 
                  alt="Époxy & Étanchéité Logo" 
                  className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{color: '#eab308'}}>Époxy & Étanchéité</span>
                  <span className="text-sm" style={{color: '#eab308'}}>By LaMaison.tn</span>
                </div>
              </a>
            </div>
            <p className="text-gray-300 leading-relaxed" style={isRTL ? {textAlign: 'right', width: '100%'} : {}}>
              {t('footer.description')}
            </p>
            <div className="space-y-3" style={isRTL ? {width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'} : {}}>
              <div className="flex items-center space-x-3" style={isRTL ? {flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '12px'} : {}}>
                <FaPhone className="text-gold-400" />
                <span className="text-gray-300 ltr">+216 55 072 043</span>
              </div>
              <div className="flex items-center space-x-3" style={isRTL ? {flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '12px'} : {}}>
                <FaPhone className="text-gold-400" />
                <span className="text-gray-300 ltr">+216 54 558 463</span>
              </div>
              <div className="flex items-center space-x-3" style={isRTL ? {flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '12px'} : {}}>
                <FaMapMarkerAlt className="text-gold-400" />
                <span className="text-gray-300">V672+GH RN8, rue bizerte, Tunis 2000, Ariana, Tunisia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">{t('services.title')}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-gold-400 transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Business Hours */}
          <div className="space-y-6" style={isRTL ? {textAlign: 'right', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'} : {}}>
            <div className="space-y-4" style={isRTL ? {width: '100%'} : {}}>
              <h4 className="font-semibold text-white" style={isRTL ? {textAlign: 'right'} : {}}>{t('footer.follow_us')}</h4>
              <div className="flex space-x-4" style={isRTL ? {justifyContent: 'flex-end', width: '100%'} : {}}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gold-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4" style={isRTL ? {width: '100%'} : {}}>
              <h4 className="font-semibold text-white mb-3" style={isRTL ? {textAlign: 'right'} : {}}>{t('footer.business_hours')}</h4>
              <div className="space-y-1 text-sm text-gray-300" style={isRTL ? {textAlign: 'right'} : {}}>
                <div>{t('contact.hours_weekdays')}</div>
                <div>{t('contact.hours_weekend')}</div>
                <div>{t('contact.hours_emergency')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Époxy & Étanchéité - By LaMaison.tn. {t('footer.rights')}
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                {t('footer.privacy_policy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                {t('footer.terms_service')}
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                {t('footer.cookie_policy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
