import { useMutation } from '@tanstack/react-query'
import { login } from '../services/authService'
import useAuthStore from '../../../stores/authStore'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,

    onSuccess: (data) => {
      setAuth(data)
    },
  })
}
