
import api from '../../../api/axios'

export const getTrips = async () => {
  const { data } = await api.get('/trips')

  return data
}

export const createTrip = async (tripData) => {
  const { data } = await api.post('/trips', tripData)

  return data
}
export const updateTrip = async ({ id, tripData }) => {
  const { data } = await api.patch(`/trips/${id}`, tripData)
  return data
}
export const cancelTrip = async (id) => {
  const { data } = await api.delete(`/trips/${id}`)
  return data
}
export const getTripById = async (id) => {
  const { data } = await api.get(`/trips/${id}`)
  return data
}