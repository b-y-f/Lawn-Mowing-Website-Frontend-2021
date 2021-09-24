import quoteService from '../services/booking'


const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}


export function setUser(user){
  quoteService.setToken(user.token)
  return {
    type: 'LOGIN',
    user
  }
}


export default userReducer