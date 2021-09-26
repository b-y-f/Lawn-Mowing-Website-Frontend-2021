import axios from 'axios'
const baseUrl = '/api/users'
import { token } from './token'



const getAll = async() => {
  const config = {
    headers: { Authorization : token },
  }
  const res = await axios.get(baseUrl,config)
  return res.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response
}

const update = (newObject) => {
  const config = {
    headers: { Authorization : token },
  }
  const request = axios.put(baseUrl, newObject,config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

export default { getAll,create,update,remove }