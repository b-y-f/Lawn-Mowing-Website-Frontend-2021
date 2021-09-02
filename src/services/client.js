import axios from 'axios'
const baseUrl = '/api/clients'

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBookingsById = async clientId => {
  const requst = await axios.get(baseUrl + `/${clientId}`)
  return requst.data.bookings
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

export default { getAll,create,update,remove,getBookingsById }