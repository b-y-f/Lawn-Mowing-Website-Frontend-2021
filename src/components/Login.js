import { React, useState } from 'react'

const Login = ({ handleUserLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return(
    <>
      <h2>Login</h2>
      <form onSubmit={(evt) => {
        evt.preventDefault()
        handleUserLogin({ username,password })
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