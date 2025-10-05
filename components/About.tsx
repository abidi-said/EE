import { FaAward, FaUsers } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'
import { useLanguage } from '../contexts/LanguageContext'

const About = () => {
  const { t } = useTranslation('common')
  const { isRTL } = useLanguage()


  const values = [
    {
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      title: t('about.values.craftsmanship.title'),
      description: t('about.values.craftsmanship.description')
    },
    {
      title: t('about.values.customer.title'),
      description: t('about.values.customer.description')
    },
    {
      title: t('about.values.reliable.title'),
      description: t('about.values.reliable.description')
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.main_description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                {t('about.expert_title')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.expert_description')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.expert_description2')}
              </p>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/Team/500293586_122097894374890475_1720770030385138093_n.png"
                alt="Notre équipe professionnelle"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating elements */}
            <div className={`absolute -top-6 ${isRTL ? '-left-6' : '-right-6'} w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-3xl">🏆</span>
            </div>
            <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>


        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values_title')}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.values_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
