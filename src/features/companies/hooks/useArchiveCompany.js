
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveCompany } from '../services/companiesService'

export const useArchiveCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: archiveCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      })
    },
  })
}
