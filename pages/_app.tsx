import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '../contexts/LanguageContext'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

export default App
