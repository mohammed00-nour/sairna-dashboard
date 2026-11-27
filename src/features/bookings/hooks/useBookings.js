import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../services/bookingsService'

export const useBookings = (enabled = true) => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    enabled,
  })
}