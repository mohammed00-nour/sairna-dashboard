import api from '../../../api/axios'

export const getBookings = async () => {
  const { data } = await api.get('/bookings')

  return data
}

export const getBookingById = async (id) => {
  const { data } = await api.get(`/bookings/${id}`)

  return data
}

export const cancelBooking = async (id) => {
  const { data } = await api.post(`/bookings/${id}/cancel`)

  return data
}
