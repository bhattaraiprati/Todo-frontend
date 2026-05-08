import { create } from 'zustand'
import { User } from '@/types'
import { authApi } from '@/lib/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  initializeAuth: () => {
    const user = authApi.getStoredUser()
    const token = authApi.getToken()
    if (user && token) {
      set({ user, isAuthenticated: true })
    }
  },

  setAuth: (user, token) => {
    set({ user, isAuthenticated: true })
  },

  clearAuth: () => {
    authApi.logout()
    set({ user: null, isAuthenticated: false })
  },
}))
