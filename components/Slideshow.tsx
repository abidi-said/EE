import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const slides = [
    {
      id: 1,
      image: '/images/slideshow/etancheite-toiture-commerciale.png',
      title: 'Étanchéité Toiture Commerciale',
      location: 'Tunis, Tunisie'
    },
    {
      id: 2,
      image: '/images/slideshow/revetement-epoxy-industriel.png',
      title: 'Revêtement Époxy Industriel',
      location: 'Sfax, Tunisie'
    },
    {
      id: 3,
      image: '/images/slideshow/isolation-sous-sol-residentiel.png',
      title: 'Isolation Sous-sol Résidentiel',
      location: 'Ariana, Tunisie'
    },
    {
      id: 4,
      image: '/images/slideshow/protection-murale-exterieure.png',
      title: 'Protection Murale Extérieure',
      location: 'Sousse, Tunisie'
    },
    {
      id: 5,
      image: '/images/slideshow/sols-epoxy-entrepot.png',
      title: 'Sols Époxy Entrepôt',
      location: 'Bizerte, Tunisie'
    },
    {
      id: 6,
      image: '/images/slideshow/etancheite-terrasse.png',
      title: 'Étanchéité Terrasse',
      location: 'Monastir, Tunisie'
    },
    {
      id: 7,
      image: '/images/slideshow/revetement-toiture-plate.png',
      title: 'Revêtement Toiture Plate',
      location: 'Nabeul, Tunisie'
    },
    {
      id: 8,
      image: '/images/slideshow/etancheite-batiment-commercial.png',
      title: 'Étanchéité Bâtiment Commercial',
      location: 'Gabès, Tunisie'
    },
    {
      id: 9,
      image: '/images/slideshow/sols-epoxy-industriel.png',
      title: 'Sols Époxy Industriel',
      location: 'Gafsa, Tunisie'
    },
    {
      id: 10,
      image: '/images/slideshow/etancheite-residentiel.png',
      title: 'Étanchéité Résidentiel',
      location: 'Kairouan, Tunisie'
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('slideshow.work_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('slideshow.work_subtitle')}
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative h-[28rem] lg:h-[32rem] perspective-1000">
          {/* Navigation Arrows - Inside slideshow container */}
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-white hover:bg-gray-100 text-navy-800 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isRTL ? 'right-4' : 'left-4'
            }`}
            style={{
              transform: 'translateY(-50%) translateZ(20px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = 'translateY(-50%) translateZ(25px) scale(1.1)'
              target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = 'translateY(-50%) translateZ(20px) scale(1)'
              target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <FaChevronLeft className={`text-2xl ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-white hover:bg-gray-100 text-navy-800 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isRTL ? 'left-4' : 'right-4'
            }`}
            style={{
              transform: 'translateY(-50%) translateZ(20px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = 'translateY(-50%) translateZ(25px) scale(1.1)'
              target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = 'translateY(-50%) translateZ(20px) scale(1)'
              target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <FaChevronRight className={`text-2xl ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex justify-center items-center h-full">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide
              const isVisible = Math.abs(index - currentSlide) <= 3 // Show 7 cards (current + 3 on each side)
              
              if (!isVisible) return null
              
              // Calculate relative position with proper wrapping
              let relativeIndex = index - currentSlide
              if (relativeIndex > slides.length / 2) {
                relativeIndex -= slides.length
              } else if (relativeIndex < -slides.length / 2) {
                relativeIndex += slides.length
              }
              
              let cardStyle = {}
              let cardClass = 'absolute transition-all duration-700 ease-out'
              
              // Card positioning and 3D effects
              if (relativeIndex === 0) {
                // Center card (active)
                cardStyle = {
                  transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
                  zIndex: 10,
                  opacity: 1
                }
              } else if (relativeIndex === -1) {
                // Left card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(120px) translateZ(-50px) rotateY(15deg) scale(0.9)' 
                    : 'translateX(-120px) translateZ(-50px) rotateY(-15deg) scale(0.9)',
                  zIndex: 8,
                  opacity: 0.8
                }
              } else if (relativeIndex === 1) {
                // Right card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(-120px) translateZ(-50px) rotateY(-15deg) scale(0.9)' 
                    : 'translateX(120px) translateZ(-50px) rotateY(15deg) scale(0.9)',
                  zIndex: 8,
                  opacity: 0.8
                }
              } else if (relativeIndex === -2) {
                // Far left card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(200px) translateZ(-100px) rotateY(25deg) scale(0.8)' 
                    : 'translateX(-200px) translateZ(-100px) rotateY(-25deg) scale(0.8)',
                  zIndex: 6,
                  opacity: 0.6
                }
              } else if (relativeIndex === 2) {
                // Far right card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(-200px) translateZ(-100px) rotateY(-25deg) scale(0.8)' 
                    : 'translateX(200px) translateZ(-100px) rotateY(25deg) scale(0.8)',
                  zIndex: 6,
                  opacity: 0.6
                }
              } else if (relativeIndex === -3) {
                // Very far left card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(280px) translateZ(-150px) rotateY(35deg) scale(0.7)' 
                    : 'translateX(-280px) translateZ(-150px) rotateY(-35deg) scale(0.7)',
                  zIndex: 4,
                  opacity: 0.4
                }
              } else if (relativeIndex === 3) {
                // Very far right card
                cardStyle = {
                  transform: isRTL 
                    ? 'translateX(-280px) translateZ(-150px) rotateY(-35deg) scale(0.7)' 
                    : 'translateX(280px) translateZ(-150px) rotateY(35deg) scale(0.7)',
                  zIndex: 4,
                  opacity: 0.4
                }
              }

              return (
                <div
                  key={slide.id}
                  className={cardClass}
                  style={{
                    ...cardStyle,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card */}
                  <div 
                    className="relative w-80 h-96 lg:w-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                    style={{
                      transform: 'translateZ(20px)',
                      boxShadow: isActive 
                        ? '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' 
                        : '0 10px 20px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.transform = 'translateZ(30px) scale(1.05)'
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.transform = 'translateZ(20px) scale(1)'
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                    onClick={() => goToSlide(index)}
                  >
                    {/* Work Project Photo */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 8s ease-out'
                      }}
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20" />

                    {/* Work Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {slide.title}
                      </h3>
                      <p className="text-gold-200 text-sm">
                        {slide.location}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      {/* Card Indicators */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-navy-800 scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              style={{
                transform: index === currentSlide ? 'translateZ(10px)' : 'translateZ(0px)',
                boxShadow: index === currentSlide ? '0 4px 15px rgba(16, 42, 67, 0.4)' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Slideshow
