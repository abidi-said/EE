import { useState } from 'react'
import { FaPlay, FaShieldAlt, FaTools, FaAward } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl text-primary-600" />,
      title: t('hero.features.waterproof.title'),
      description: t('hero.features.waterproof.description')
    },
    {
      icon: <FaTools className="text-2xl text-primary-600" />,
      title: t('hero.features.expert.title'),
      description: t('hero.features.expert.description')
    },
    {
      icon: <FaAward className="text-2xl text-primary-600" />,
      title: t('hero.features.quality.title'),
      description: t('hero.features.quality.description')
    }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-900 text-white overflow-hidden pt-32 md:pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gold-200 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="tel:+21655072043"
                className="text-navy-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                style={{backgroundColor: '#eab308'}}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#d4a017'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#eab308'}
              >
                {t('hero.cta_primary')}
              </a>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm`}
              >
                <FaPlay className="text-lg" />
                <span>{t('hero.cta_secondary')}</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-primary-200 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Company Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Thumbnail with Play Button */}
              <div 
                className="relative w-full cursor-pointer group"
                style={{ maxHeight: '400px' }}
                onClick={() => setIsVideoOpen(true)}
              >
                {/* Thumbnail Image */}
                <div 
                  className="w-full h-96 bg-cover bg-center bg-no-repeat rounded-2xl"
                  style={{
                    backgroundImage: `url('/images/slideshow/etancheite-batiment-commercial.png')`
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl group-hover:bg-opacity-30 transition-all duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-gold-500/50">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </div>
                  
                  {/* Video Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {t('hero.video.title')}
                      </h3>
                      <p className="text-gold-200 text-sm">
                        {t('hero.video.subtitle')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className={`absolute -top-4 ${isRTL ? '-left-4' : '-right-4'} w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">🏆</span>
              </div>
              <div className={`absolute -bottom-4 ${isRTL ? '-right-4' : '-left-4'} w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-xl">💯</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className={`absolute -top-12 ${isRTL ? 'left-0' : 'right-0'} text-white text-2xl hover:text-gray-300 z-10`}
            >
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video 
                className="w-full h-full object-contain modal-video"
                controls
                autoPlay
                style={{ maxHeight: 'none' }}
              >
                <source src="/company video/AQNpVv2SfbHUVpnw6cgfq7KXfG4JXPu2sNDLC-yMwUSfGznNGF4IX24q-qgwN-OcVuWH1uAqWvN7fSkwxzYBA6rqWKWkHWZxpALE52dMPBu6SQ.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        video {
          max-height: 400px !important;
          height: auto !important;
          width: 100% !important;
          object-fit: cover !important;
        }
        
        /* Modal video specific styles */
        .modal-video {
          object-fit: contain !important;
          background-color: #000;
        }
        
        video:focus {
          outline: none;
        }
        
        video::-webkit-media-controls {
          transform: scale(1);
        }
      `}</style>
    </section>
  )
}

export default Hero
