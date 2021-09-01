import { React, useEffect, useState } from 'react'
import QuoteFrom from './components/QuoteForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'

import quoteService from './services/quote'
import clientService from './services/client'
import loginService from './services/login'
import guestService from './services/guest'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container } from '@material-ui/core'


const App = () => {

  const [user, setUser] = useState(null)
  const [userQuotes, setUserQuotes] = useState([])


  useEffect(() => {
    quoteService.getAll().then((res) => {
      setUserQuotes(res)
    }).catch(err => alert('wrong when getch user quotes..', err))
  }, [user])

  const handleQuote = async (quote, guestInfo) => {
    if (!user) {
      const guest = await guestService.create(guestInfo)
      quoteService.setToken(guest.token)
    }

    quoteService.setToken(user.token)

    await quoteService.create(quote)
      .then(res => console.log(res.data))
      .catch(() => console.log('create new quote fail'))
  }

  const handleCreateUser = async (userObj) => {
    await clientService.create(userObj)
      .then(res => {
        alert(`hi ${res.data.name} you are signed up, login pls`)
      })
      .catch(() => alert('Fail, user duplicated'))
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (loginObj) => {
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
      <Navbar user={user} handleLogout={handleLogout} />

      <Container maxWidth="sm">
        <Switch>
          <Route path="/signup">
            <SignupForm handleCreateUser={handleCreateUser} />
          </Route>

          <Route path="/login">
            {user ? <Redirect to="/quotes" /> : <Login handleUserLogin={handleLogin} />}
          </Route>

          <Route path="/quotes">
            {
              user ?
                <div>
                  <h2>New Quote</h2>
                  <QuoteFrom handleQuote={handleQuote} />
                  <h2>Quote history</h2>
                  {userQuotes.map(q => (
                    <div key={q.id}>
                      <h4>Date : {q.date}</h4>
                      <h4>Service items</h4>
                      <ul>
                        {q.serviceItem.map(i => (
                          <li key={i._id}>{i.item}</li>
                        ))}
                      </ul>
                      <div>{q.comment}</div>
                    </div>
                  ))}
                </div>
                : <Redirect to="/login" />
            }

          </Route>

          <Route path="/">
            {user ? <Redirect to="/quotes" /> : <QuoteFrom handleQuote={handleQuote} user={user} />}
          </Route>

        </Switch>
      </Container>

    </Router>
  )
}


export default App
