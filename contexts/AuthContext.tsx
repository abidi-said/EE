import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { login as apiLogin, clearAuth, getStoredUser, isAuthenticated } from '../lib/api'
import type { User } from '../types/blog'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser())
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password)
    setUser(data.user)
  }

  const logout = () => {
    clearAuth()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
