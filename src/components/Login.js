import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { showMesssage } from '../reducers/noticeReducer'

const Login = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = ({ ...credentials }) => {
    try {
      dispatch(login(credentials))
      dispatch(showMesssage('Great!You logged in!',5))
      // dispatch(initBookingById(user.id))

    } catch (error) {
      console.error(error)
    }
  }
  return(
    <>
      <h2>Login</h2>
      <form onSubmit={(evt) => {
        evt.preventDefault()
        handleLogin({ username,password })
      }}>
        <div>
          username: <input
            value = {username}
            onChange ={({ target }) => setUsername(target.value)}/>
        </div>

        <div>
          password: <input
            value = {password}
            onChange ={({ target }) => setPassword(target.value)}/>
        </div>
        <button>login</button>
      </form>

    </>
  )
}

export default Login