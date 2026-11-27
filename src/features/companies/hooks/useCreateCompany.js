import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCompany } from '../services/companiesService'

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      })
    },
  })
}