
import api from '../../../api/axios'

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export const getMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}
