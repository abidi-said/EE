import { FormEvent, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import Toast from './Toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState<{ type: 'error'; message: string } | null>(null)
  const closeToast = useCallback(() => setToast(null), [])
  const [loading, setLoading] = useState(false)
  const { login, isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) router.replace('/admin/posts')
  }, [isLoggedIn])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setToast(null)
    setLoading(true)
    try {
      await login(email, password)
      router.push('/admin/posts')
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Identifiants incorrects' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Connexion Admin | Époxy & Étanchéité</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500 opacity-5 rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-500 opacity-5 rounded-full" />
        </div>

        <div className="w-full max-w-md relative">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <img src="/images/logo/EE-logo.png" alt="Logo" className="w-14 h-14 object-contain" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-xl leading-tight text-white">Époxy & Étanchéité</span>
                <span className="text-sm leading-tight" style={{ color: '#eab308' }}>By LaMaison.tn</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Administration</h1>
            <p className="text-gray-400 text-sm">Connectez-vous pour gérer le site</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all bg-gray-50"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all bg-gray-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-navy-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                style={{ backgroundColor: '#eab308' }}
                onMouseEnter={(e) => !loading && ((e.target as HTMLButtonElement).style.backgroundColor = '#d4a017')}
                onMouseLeave={(e) => !loading && ((e.target as HTMLButtonElement).style.backgroundColor = '#eab308')}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              ← Retour au site
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
