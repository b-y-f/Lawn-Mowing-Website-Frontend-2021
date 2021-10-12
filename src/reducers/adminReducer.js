// import adminService from '../services/admin'


// const adminReducer = (state = null, action) => {
//   switch (action.type) {
//   case 'LOGIN_ADMIN':
//     return action.admin
//   case 'LOGOUT_ADMIN':
//     return null
//   default:
//     return state
//   }
// }


// export function login(credentials){
//   return async dispatch => {
//     const admin = await adminService.login(credentials)

//     window.localStorage.setItem('loggedAdmin', JSON.stringify(admin))

//     return dispatch({
//       type:'LOGIN_ADMIN',
//       admin
//     })
//   }
// }

// export function setAdmin(loggedUserJSON){
//   const admin = JSON.parse(loggedUserJSON)
//   return {
//     type: 'LOGIN_ADMIN',
//     admin
//   }
// }

// export function logout(){
//   return {
//     type: 'LOGOUT_ADMIN'
//   }
// }

// export function setUser(loggedUserJSON){
//   const user = JSON.parse(loggedUserJSON)
//   return {
//     type: 'LOGIN_ADMIN',
//     user
//   }
// }


// export default adminReducer