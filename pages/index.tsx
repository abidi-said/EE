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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Head>
        <title>Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn</title>
        <meta name="description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit. +216 55 072 043" />
        <meta name="keywords" content="étanchéité époxy Tunisie, isolation toiture Tunis, revêtement sol industriel, étanchéité sous-sol, étanchéité piscine, entreprise étanchéité Tunis, isolation bâtiment, revêtement garage époxy, étanchéité terrasse, étanchéité entrepôt, sol époxy résistant, étanchéité commercial, étanchéité résidentielle, peinture, résine, résine naturelle, résine époxy, époxy, epoxy, resine, ruban d'étanchéité, étanchéité, toit, bardage, enrobage, plancher, sous-sol, toiture, protection, عزل مائي تونس, إيبوكسي تونس, عزل الأسطح, طلاء الأرضيات, عزل المباني, عزل الخزانات, عزل الحمامات, عزل الأسطح المسطحة, عزل السقف, حماية المباني, طلاء مقاوم للماء, عزل تجاري, عزل سكني, أريانة, تونس, صفاقس, سوسة, المنستير, بنزرت, قابس, LaMaison.tn" />
        <meta property="og:title" content="Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn" />
        <meta property="og:description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Étanchéité Époxy Tunisie | Isolation Toiture & Revêtement Sol | LaMaison.tn" />
        <meta name="twitter:description" content="Entreprise d'étanchéité époxy en Tunisie. Services professionnels d'isolation toiture, revêtement sol industriel, étanchéité sous-sol et piscine. Devis gratuit." />
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

