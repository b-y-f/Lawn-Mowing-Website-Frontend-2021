import axios from 'axios'
const baseUrl = '/api/guests'

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async(id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const remove = async(id) => {
  const request = await axios.delete(`${ baseUrl }/${id}`)
  return request.data
}

export default { getAll,create,update,remove }


