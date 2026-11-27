import api from '../../../api/axios'

export const getTrips = async () => {
  const { data } = await api.get('/trips')

  return data
}