
import { useQuery } from '@tanstack/react-query'
import { getMe } from '../services/authService'
import useAuthStore from '../../../stores/authStore'

export const useMe = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
  })
}
