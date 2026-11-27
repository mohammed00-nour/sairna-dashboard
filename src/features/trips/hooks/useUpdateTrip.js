
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTrip } from '../services/tripsService'

export const useUpdateTrip = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trips'],
      })
    },
  })
}
