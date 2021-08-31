import { React, useEffect, useState } from 'react'
import QuoteForm from './components/QuoteForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'

import quoteService from './services/quote'
import clientService from './services/client'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar'



const App =() => {

  const [user,setUser] = useState(null)

  // const [page,setPage] = useState('guest-quote')

  // const [message, setMessage] = useState('')

  const [userQuotes,setUserQuotes] = useState([])


  useEffect(() => {
    quoteService.getAll().then(quotes => {
      console.log('fetching data...')
      if (user){
        console.log(quotes.filter(q => q.user === user.username))
        setUserQuotes([])
      }
    }
    )
  }, [user])

  const handleNewQuote = async( quoteObj ) => {
    try {
      await quoteService.create(quoteObj)
        .then(res => res.data)
      // setMessage('quote submitted')

      // setTimeout(() => {
      //   setMessage('')
      // },3000)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCreateUser = async(userObj) => {
    await clientService.create(userObj)
      .then(res => {
        alert(`hi ${res.data.name} you are signed up, login pls`)
      })
      .catch(() => alert('Fail, user duplicated'))
  }

  const handleUserLogin = async(loginObj) => {
    await loginService.login(loginObj)
      .then(res => {
        setUser(res)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
      })
      .catch(() => alert('pass or username incorrect!!!'))
  }

  return (
    <Router>
      <div>
        <Notification message={user && `Hi, ${user.name} you are log in`} />
        <Navbar />

        <Switch>
          <Route path="/signup">
            <SignupForm handleCreateUser={handleCreateUser}/>
          </Route>

          <Route path="/login">
            <Login handleUserLogin={handleUserLogin}/>
          </Route>

          <Route path="/quotes">
            <div>
              {userQuotes}
            </div>
          </Route>

          <Route path="/">
            <QuoteForm handleNewQuote={handleNewQuote}/>
          </Route>

        </Switch>
      </div>

    </Router>
  )
}

export default App
