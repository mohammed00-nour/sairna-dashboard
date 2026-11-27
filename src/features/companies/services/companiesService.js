import api from '../../../api/axios'

export const getCompanies = async () => {
    const { data } = await api.get('/companies')

    return data
}
export const createCompany = async (companyData) => {
    const { data } = await api.post('/companies', companyData)

    return data
}
export const updateCompany = async ({ id, companyData }) => {
    const { data } = await api.patch(`/companies/${id}`, companyData)

    return data
}
export const archiveCompany = async (id) => {
  const { data } = await api.delete(`/companies/${id}`)

  return data
}
