
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelBooking } from '../services/bookingsService'

export const useCancelBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['booking', id] })
    },
  })
}
