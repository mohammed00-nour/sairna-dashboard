import { useQuery } from '@tanstack/react-query'
import { getTripById } from '../services/tripsService'

export const useTrip = (id) => {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTripById(id),
    enabled: Boolean(id),
  })
}