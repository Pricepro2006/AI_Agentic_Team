import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // For TypeScript system, we'll use a simplified auth
        // In production, this would call the TypeScript API
        if (email === 'admin@typescript.ai' && password === 'typescript123') {
          const user: User = {
            id: '1',
            email: 'admin@typescript.ai',
            name: 'TypeScript Admin',
            role: 'admin'
          }
          const token = 'typescript-token-' + Date.now()
          set({ user, token, isAuthenticated: true })
          return true
        }
        return false
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
      
      setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true })
      }
    }),
    {
      name: 'typescript-auth',
    }
  )
)