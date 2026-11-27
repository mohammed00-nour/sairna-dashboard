
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCompany } from '../services/companiesService'

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      })
    },
  })
}
