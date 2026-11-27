import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../services/companiesService'

export const useCompanies = (enabled = true) => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    enabled,
  })
}