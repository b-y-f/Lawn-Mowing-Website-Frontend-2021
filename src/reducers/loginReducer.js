import loginService from '../services/login'
import quoteService from '../services/quote'


const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  case 'SET_USER':
    return action.user
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
  return {
    type: 'LOGOUT'
  }
}

export function setUser(loggedUserJSON){
  const user = JSON.parse(loggedUserJSON)
  quoteService.setToken(user.token)
  return {
    type: 'SET_USER',
    user
  }
}


export default userReducer