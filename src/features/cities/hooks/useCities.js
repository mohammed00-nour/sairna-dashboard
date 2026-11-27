import { useQuery } from '@tanstack/react-query'
import { getCities } from '../services/citiesService'

export const useCities = (enabled = true) => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
    enabled,
    staleTime: 1000 * 60 * 10,
  })
}