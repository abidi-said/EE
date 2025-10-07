import { FaHome, FaBuilding, FaIndustry, FaWarehouse, FaShieldAlt, FaTools } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Services = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const services = [
    {
      icon: <FaHome className="text-4xl text-primary-600" />,
      title: t('services.residential.title'),
      description: t('services.residential.description'),
      features: t('services.residential.features', { returnObjects: true })
    },
    {
      icon: <FaBuilding className="text-4xl text-primary-600" />,
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      features: t('services.commercial.features', { returnObjects: true })
    },
    {
      icon: <FaIndustry className="text-4xl text-primary-600" />,
      title: t('services.epoxy.title'),
      description: t('services.epoxy.description'),
      features: t('services.epoxy.features', { returnObjects: true })
    },
    {
      icon: <FaWarehouse className="text-4xl text-primary-600" />,
      title: t('services.warehouse.title'),
      description: t('services.warehouse.description'),
      features: t('services.warehouse.features', { returnObjects: true })
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary-600" />,
      title: t('services.protective.title'),
      description: t('services.protective.description'),
      features: t('services.protective.features', { returnObjects: true })
    },
    {
      icon: <FaTools className="text-4xl text-primary-600" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      features: t('services.maintenance.features', { returnObjects: true })
    }
  ]

  return (
    <section id="services" className={`py-20 bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid gap-8 ${isRTL ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 group ${isRTL ? 'rtl' : 'ltr'}`}
            >
              {isRTL ? (
                // RTL Layout - Column arrangement
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-right">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 text-right">
                    {(service.features as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center justify-end text-sm text-gray-700">
                        <span className="text-right">{feature}</span>
                        <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className="w-full text-navy-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{backgroundColor: '#eab308'}}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#d4a017'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#eab308'}
                  >
                    {t('common.get_quote')}
                  </button>
                </div>
              ) : (
                // LTR Layout - Original centered layout
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {(service.features as string[]).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    className="w-full text-navy-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{backgroundColor: '#eab308'}}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#d4a017'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#eab308'}
                  >
                    {t('common.get_quote')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`bg-navy-800 rounded-2xl p-12 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
            <h3 className={`text-3xl font-bold mb-4 ${isRTL ? 'text-center' : 'text-center'}`}>{t('services.cta.title')}</h3>
            <p className={`text-xl text-gold-200 mb-8 max-w-2xl mx-auto ${isRTL ? 'text-center' : 'text-center'}`}>
              {t('services.cta.description')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="tel:+21655072043"
                className="text-navy-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                style={{backgroundColor: '#eab308'}}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#d4a017'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#eab308'}
              >
                {t('services.cta.consultation')}
              </a>
              <a
                href="tel:+21655072043"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm text-center"
              >
                {isRTL ? (
                  <span>
                    {t('services.cta.call')} <span className="ltr" style={{direction: 'ltr', unicodeBidi: 'bidi-override'}}>{t('services.cta.phone')}</span>
                  </span>
                ) : (
                  t('services.cta.call')
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
