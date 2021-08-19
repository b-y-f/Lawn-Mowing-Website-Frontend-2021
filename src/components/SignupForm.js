import { React, useState } from 'react'

const SignupForm = ({ handleCreateUser }) => {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')



  return(
    <>
      <h2>Sign up</h2>

      <form onSubmit={(evt) => {
        evt.preventDefault()
        handleCreateUser({ username,password,name,address,phone,email })
      }}>

        <div>
      username:
          <input
            value = {username}
            onChange ={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
      password:
          <input
            value = {password}
            onChange ={({ target }) => setPassword(target.value)}
          />
        </div>

        <div>
      name:
          <input
            value = {name}
            onChange ={({ target }) => setName(target.value)}
          />
        </div>

        <div>
      address:
          <input
            value = {address}
            onChange ={({ target }) => setAddress(target.value)}
          />
        </div>

        <div>
      phone:
          <input
            value = {phone}
            onChange ={({ target }) => setPhone(target.value)}
          />
        </div>

        <div>
      email:
          <input
            value = {email}
            onChange ={({ target }) => setEmail(target.value)}
          />
        </div>
        <button>sign up</button>
      </form>

    </>
  )
}

export default SignupForm