
import { useQuery } from '@tanstack/react-query'
import { getBookingById } from '../services/bookingsService'

export const useBooking = (id) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    enabled: Boolean(id),
  })
}
