import axios from 'axios'
const baseUrl = '/api/bookings'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = {
  headers: { Authorization : token },
}

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getById = async(id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const remove = async(id) => {
  const response = await axios.delete(`${ baseUrl }/${id}`)
  return response.data
}

export default { getAll,create,update,remove,setToken,getById }