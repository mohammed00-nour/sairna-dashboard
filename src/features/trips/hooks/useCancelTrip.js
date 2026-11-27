
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelTrip } from '../services/tripsService'

export const useCancelTrip = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelTrip,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trips'],
      })
    },
  })
}
