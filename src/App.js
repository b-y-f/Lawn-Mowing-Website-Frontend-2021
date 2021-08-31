import { React, useEffect, useState } from 'react'
import QuoteFrom from './components/QuoteForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'

import clientQuoteService from './services/quoteClient'
import guestQuoteService from './services/quoteGuest'
import clientService from './services/client'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container } from '@material-ui/core'


const App =() => {

  const [user,setUser] = useState(null)
  const [userQuotes,setUserQuotes] = useState([])


  useEffect(() => {
    clientQuoteService.getAll().then(quotes => {
      console.log('fetching data...')
      if (user){
        console.log(quotes.filter(q => q.user === user.username))
        setUserQuotes([])
      }
    }
    )
  }, [user])

  const handleQuote = async( quote ) => {
    try {
      if(quote.isGuest){
        await guestQuoteService.create(quote)
          .then(res => res.data)
      }else{
        await clientQuoteService.create(quote)
          .then(res => res.data)
      }
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

      <Notification />
      <Navbar user={user} />

      <Container maxWidth="sm">
        <Switch>
          <Route path="/signup">
            <SignupForm handleCreateUser={handleCreateUser}/>
          </Route>

          <Route path="/login">
            {user?<Redirect to="/quotes" />:<Login handleUserLogin={handleUserLogin}/>}
          </Route>

          <Route path="/quotes">
            <div>
              <h2>New Quote</h2>
              <QuoteFrom handleQuote={handleQuote} user={user}/>
              <h2>Quote history</h2>
              {userQuotes}
            </div>
          </Route>

          <Route path="/">
            {user? <Redirect to="/quotes" />: <QuoteFrom handleQuote={handleQuote} user={user}/> }
          </Route>

        </Switch>
      </Container>

    </Router>
  )
}


export default App
