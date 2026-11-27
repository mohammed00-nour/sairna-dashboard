
import api from '../../../api/axios'

export const getOverview = async () => {
  const { data } = await api.get('/overview')

  return data
}
