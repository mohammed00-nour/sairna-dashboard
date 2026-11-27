import { useQuery } from '@tanstack/react-query'
import { getTrips } from '../services/tripsService'

export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
  })
}
