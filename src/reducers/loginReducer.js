import loginService from '../services/login'
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

export function login(credentials){
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    quoteService.setToken(user.token)
    return dispatch({
      type:'LOGIN',
      user
    })
  }
}

export function logout(){
  window.localStorage.clear()
  return {
    type: 'LOGOUT'
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