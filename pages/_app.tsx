import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '../contexts/LanguageContext'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

export default App
