import type { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy-900 mb-4">
          {statusCode || '500'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {statusCode
            ? `Une erreur ${statusCode} est survenue`
            : 'Une erreur est survenue'}
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg font-bold text-navy-900 transition-all duration-300 shadow-lg hover:scale-105"
          style={{ backgroundColor: '#eab308' }}
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
