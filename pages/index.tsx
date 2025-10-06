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
        <title>Époxy & Étanchéité - By LaMaison.tn | Services Professionnels en Tunisie</title>
        <meta name="description" content="Époxy & Étanchéité by LaMaison.tn - Services professionnels d'étanchéité et de revêtement époxy en Tunisie. Protégez votre propriété avec nos solutions expertes. +216 55 072 043" />
        <meta name="keywords" content="époxy, étanchéité, revêtement, toiture, construction, Tunisie, Ariana, Tunis, LaMaison.tn" />
        <meta property="og:title" content="Époxy & Étanchéité - By LaMaison.tn" />
        <meta property="og:description" content="Services professionnels d'étanchéité et de revêtement époxy en Tunisie. Protégez votre propriété avec nos solutions expertes." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Époxy & Étanchéité - By LaMaison.tn" />
        <meta name="twitter:description" content="Services professionnels d'étanchéité et de revêtement époxy en Tunisie. Protégez votre propriété avec nos solutions expertes." />
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

