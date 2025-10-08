import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '../contexts/LanguageContext'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo/EE-logo.png" type="image/png" />
        <link rel="icon" href="/images/logo/EE-logo.png" />
        <link rel="apple-touch-icon" href="/images/logo/EE-logo.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

export default App
