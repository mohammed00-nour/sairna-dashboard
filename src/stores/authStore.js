
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          user: data.user,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'sairna-dashboard-auth',
    },
  ),
)

export default useAuthStore
