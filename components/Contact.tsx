import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Contact = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-primary-600" />,
      title: t('contact.phone'),
      details: ["+216 55 072 043"],
      action: t('contact.form.submit'),
      phone: "+21655072043"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary-600" />,
      title: t('contact.address'),
      details: ["V672+GH RN8, rue bizerte", "Tunis 2000, Ariana, Tunisia"],
      action: t('contact.get_directions'),
      mapUrl: "https://maps.google.com/?q=V672%2BGH+RN8,+rue+bizerte,+Tunis+2000,+Ariana,+Tunisia"
    },
    {
      icon: <FaClock className="text-2xl text-primary-600" />,
      title: t('contact.hours'),
      details: [t('contact.hours_weekdays'), t('contact.hours_weekend'), t('contact.hours_emergency')],
      action: t('contact.emergency')
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.location')}</h3>
            
            <div className="space-y-6">
              {/* Map Embed */}
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5!2d10.2!3d36.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ4JzAwLjAiTiAxMMKwMTInMDAuMCJF!5e0!3m2!1sen!2stn!4v1234567890123!5m2!1sen!2stn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map - V672+GH RN8, rue bizerte, Tunis 2000, Ariana, Tunisia"
                ></iframe>
              </div>
              
              {/* Alternative: Direct link to Google Maps */}
              <div className="text-center">
                <a
                  href="https://maps.google.com/?q=V672%2BGH+RN8%2C+rue+bizerte%2C+Tunis+2000%2C+Ariana%2C+Tunisia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-navy-900 rounded-lg transition-colors duration-200"
                  style={{backgroundColor: '#eab308'}}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#d4a017'}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#eab308'}
                >
                  <FaMapMarkerAlt className="mr-2" />
                  {t('contact.get_directions')}
                </a>
              </div>
              
              {/* Address Details */}
              <div className="bg-gold-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-2xl text-navy-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('contact.address')}</h4>
                    <p className="text-gray-600 mb-2">V672+GH RN8, rue bizerte</p>
                    <p className="text-gray-600">Tunis 2000, Ariana, Tunisia</p>
                    <a
                      href="https://maps.google.com/?q=V672%2BGH+RN8,+rue+bizerte,+Tunis+2000,+Ariana,+Tunisia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-navy-600 hover:text-navy-700 font-medium mt-3 transition-colors duration-200"
                    >
                      {t('contact.get_directions')} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.contact_info')}</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="flex-shrink-0 p-3 bg-gold-50 rounded-lg">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                      {info.phone ? (
                        <a
                          href={`tel:${info.phone}`}
                            className="text-navy-600 hover:text-navy-700 font-medium mt-2 transition-colors duration-200"
                        >
                          {info.action} →
                        </a>
                      ) : info.mapUrl ? (
                        <a
                          href={info.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                            className="text-navy-600 hover:text-navy-700 font-medium mt-2 transition-colors duration-200"
                        >
                          {info.action} →
                        </a>
                      ) : (
                        <span className="text-primary-600 font-medium mt-2">
                          {info.action} →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Service Area */}
                <div className="bg-navy-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{t('contact.service_areas')}</h3>
              <p className="text-gold-200 mb-4">
                {t('contact.service_areas_description')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                <div>• {t('contact.area_tunis')}</div>
                <div>• {t('contact.area_ariana')}</div>
                <div>• {t('contact.area_manouba')}</div>
                <div>• {t('contact.area_ben_arous')}</div>
                <div>• {t('contact.area_sfax')}</div>
                <div>• {t('contact.area_sousse')}</div>
                <div>• {t('contact.area_monastir')}</div>
                <div>• {t('contact.area_mahdia')}</div>
                <div>• {t('contact.area_kairouan')}</div>
                <div>• {t('contact.area_bizerte')}</div>
                <div>• {t('contact.area_beja')}</div>
                <div>• {t('contact.area_jendouba')}</div>
                <div>• {t('contact.area_kef')}</div>
                <div>• {t('contact.area_siliana')}</div>
                <div>• {t('contact.area_zaghouan')}</div>
                <div>• {t('contact.area_nabeul')}</div>
                <div>• {t('contact.area_gabes')}</div>
                <div>• {t('contact.area_medenine')}</div>
                <div>• {t('contact.area_tataouine')}</div>
                <div>• {t('contact.area_gafsa')}</div>
                <div>• {t('contact.area_tozeur')}</div>
                <div>• {t('contact.area_kebili')}</div>
              </div>
              <p className="text-gold-300 text-sm mt-4">
                {t('contact.service_areas_contact')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
