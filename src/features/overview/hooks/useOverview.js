
import { useQuery } from '@tanstack/react-query'
import { getOverview } from '../services/overviewService'

export const useOverview = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: getOverview,
  })
}
