import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<{ image: string; title: string; location: string }[]>([])
  const [loaded, setLoaded] = useState(false)
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  useEffect(() => {
    fetch('/api/site-config')
      .then((r) => r.json())
      .then((config) => {
        if (config.slides?.length > 0) setSlides(config.slides)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!loaded && slides.length === 0) return null

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
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
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 hover:bg-white text-navy-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
              isRTL ? 'right-2 sm:right-4' : 'left-2 sm:left-4'
            }`}
          >
            <FaChevronLeft className={`text-lg sm:text-2xl ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 hover:bg-white text-navy-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
              isRTL ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
            }`}
          >
            <FaChevronRight className={`text-lg sm:text-2xl ${isRTL ? 'rotate-180' : ''}`} />
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
                  key={index}
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
    </section>
  )
}

export default Slideshow
