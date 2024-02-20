import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/@types/User'

interface IAuthStore {
  accessToken: string | undefined
  refreshToken: string | undefined
  user: Pick<User, 'email' | 'role'> | undefined
  setAccessToken: (accessToken: string | undefined) => void
  setRefreshToken: (refreshToken: string | undefined) => void
  setUser: (user: Pick<User, 'email' | 'role'> | undefined) => void
  clearAuthStore: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
      setAccessToken: (accessToken) => {
        set((state) => {
          return {
            ...state,
            accessToken
          }
        })
      },
      setRefreshToken: (refreshToken) => {
        set((state) => {
          return {
            ...state,
            refreshToken
          }
        })
      },
      setUser: (user) => {
        set((state) => {
          return {
            ...state,
            user
          }
        })
      },
      clearAuthStore: () => {
        set((state) => {
          return {
            ...state,
            accessToken: undefined,
            refreshToken: undefined,
            user: undefined
          }
        })
      },
    }),
    {
      name: 'user'
    }
  )
)