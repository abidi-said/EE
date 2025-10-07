import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Slideshow from '../components/Slideshow'
import About from '../components/About'
import TunisiaMap from '../components/TunisiaMap'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { getBaseUrl } from '../utils/getBaseUrl'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    setIsLoaded(true)
    setBaseUrl(getBaseUrl())
  }, [])

  return (
    <>
      <Head>
        <title>Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn</title>
        <meta name="description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit. +216 55 072 043" />
        <meta name="keywords" content="étanchéité époxy Tunisie, isolation toiture Tunis, revêtement sol industriel, étanchéité sous-sol, étanchéité piscine, entreprise étanchéité Tunis, isolation bâtiment, revêtement garage époxy, étanchéité terrasse, étanchéité entrepôt, sol époxy résistant, étanchéité commercial, étanchéité résidentielle, peinture, résine, résine naturelle, résine époxy, époxy, epoxy, resine, ruban d'étanchéité, étanchéité, toit, bardage, enrobage, plancher, sous-sol, toiture, protection, عزل مائي تونس, إيبوكسي تونس, عزل الأسطح, طلاء الأرضيات, عزل المباني, عزل الخزانات, عزل الحمامات, عزل الأسطح المسطحة, عزل السقف, حماية المباني, طلاء مقاوم للماء, عزل تجاري, عزل سكني, أريانة, تونس, صفاقس, سوسة, المنستير, بنزرت, قابس, LaMaison.tn" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={baseUrl || 'https://epoxyetancheite.netlify.app/'} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn" />
        <meta property="og:description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl || 'https://epoxyetancheite.netlify.app/'} />
        <meta property="og:image" content={`${baseUrl || 'https://epoxyetancheite.netlify.app'}/images/slideshow/etancheite-batiment-commercial.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_TN" />
        <meta property="og:site_name" content="Époxy & Étanchéité" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn" />
        <meta name="twitter:description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit." />
        <meta name="twitter:image" content={`${baseUrl || 'https://epoxyetancheite.netlify.app'}/images/slideshow/etancheite-batiment-commercial.png`} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Époxy & Étanchéité" />
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunis, Ariana, Tunisie" />
        <meta name="geo.position" content="36.8065;10.1815" />
        <meta name="ICBM" content="36.8065, 10.1815" />
        
        {/* Structured Data - LocalBusiness */}
        {baseUrl && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Époxy & Étanchéité",
                "alternateName": "Étanchéité Pro",
                "description": "Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine.",
                "url": baseUrl,
                "telephone": "+21655072043",
                "email": "contact@epoxyetancheite.tn",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "V672+GH RN8, rue bizerte",
                  "addressLocality": "Ariana",
                  "addressRegion": "Tunis",
                  "postalCode": "2000",
                  "addressCountry": "TN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "36.8065",
                  "longitude": "10.1815"
                },
                "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-14:00",
                "priceRange": "$$",
                "image": `${baseUrl}/images/slideshow/etancheite-batiment-commercial.png`,
                "logo": `${baseUrl}/images/slideshow/etancheite-batiment-commercial.png`,
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61576714255009"
                ],
                "serviceArea": {
                  "@type": "Country",
                  "name": "Tunisia"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Services d'Étanchéité et Époxy",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Étanchéité Résidentielle",
                        "description": "Services d'étanchéité pour maisons et appartements"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Étanchéité Commerciale",
                        "description": "Solutions d'étanchéité pour bâtiments commerciaux"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Sols Époxy Industriels",
                        "description": "Revêtements époxy pour sols industriels"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Étanchéité Entrepôts",
                        "description": "Protection étanche pour entrepôts et hangars"
                      }
                    }
                  ]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "25"
                }
              })
            }}
          />
        )}
      </Head>

      <div className={`min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <Header />
            <main>
              <Hero />
              <Services />
              <Slideshow />
              <About />
              <TunisiaMap />
              <Contact />
            </main>
            <Footer />
      </div>
    </>
  )
}

