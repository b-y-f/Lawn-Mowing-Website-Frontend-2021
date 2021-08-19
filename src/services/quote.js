import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/quotes'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const request = await axios.get(baseUrl).then(res => res.data)
  return request
}

const create = async newObject => {
  const config = {
    headers: { Authorization : token },
  }
  const response = await axios.post(baseUrl, newObject, config)
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

export default { getAll,create,update,remove,setToken }