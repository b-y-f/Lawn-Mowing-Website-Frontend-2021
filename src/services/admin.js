import axios from 'axios'
const baseUrl = '/api/admin'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl+'/login', credentials)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export default { login }