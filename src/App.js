import { React, useState } from 'react'
import QuoteForm from './components/QuoteForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'

import quoteService from './services/quote'
import clientService from './services/client'
import loginService from './services/login'


const App =() => {

  const [user,setUser] = useState(null)
  console.log(user)

  const [page,setPage] = useState('guest-quote')

  const [message, setMessage] = useState('')

  const handleNewQuote = async( quoteObj ) => {
    try {
      await quoteService.create(quoteObj)
        .then(res => res.data)
      setMessage('quote submitted')

      setTimeout(() => {
        setMessage('')
      },3000)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCreateUser = async(userObj) => {
    await clientService.create(userObj)
      .then(res => {
        alert(`hi ${res.data.name} you are signed up, login pls`)
        setPage('login')
      })
      .catch(() => console.log('Fail'))
  }

  const handleUserLogin = async(loginObj) => {
    await loginService.login(loginObj)
      .then(res => {
        setUser(res)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        setPage('clientDash')
      })
      .catch(() => alert('pass or username incorrect!!!'))

  }

  if ( page==='signup'){
    return (
      <SignupForm handleCreateUser={handleCreateUser}/>
    )
  }else if(page === 'login'){
    return(
      <Login handleUserLogin={handleUserLogin}/>
    )
  }else if (page === 'clientDash'){
    return(
      <>
        <Notification message={`Hi, ${user.name} you are log in`} />
        <h2>This is client client Dash</h2>
        <p>will show their past bookings</p>
      </>
    )
  }

  else{
    return (
      <div>
        <button onClick={() => setPage('signup')}>sign up</button>
        <button onClick={() => setPage('login')}>login</button>

        <br/>
        <Notification message={message}/>
        <h2>Quote</h2>
        <QuoteForm handleNewQuote={handleNewQuote}/>
      </div>
    )
  }


}

export default App
