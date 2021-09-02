import { React, useEffect, useState } from 'react'
import QuoteFrom from './components/QuoteForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'

import quoteService from './services/quote'
import clientService from './services/client'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { showMesssage } from './reducers/noticeReducer'
import { logout,login, setUser } from './reducers/loginReducer'


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [userQuotes, setUserQuotes] = useState([])


  useEffect(() => {
    quoteService.getAll().then((res) => {
      setUserQuotes(res)
    }).catch(err => alert('wrong when getch user quotes..', err))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      dispatch(setUser(loggedUserJSON))
    }

  }, [dispatch])

  const handleQuote = async (quote) => {

    if (user){
      await quoteService.create(quote)
        .then(res => console.log(res.data))
        .catch(() => console.log('create new quote fail'))
    }
  }

  const handleCreateUser = async (userObj) => {

    try {
      const res =  await clientService.create(userObj)
      dispatch(showMesssage(`hi ${res.data.name} you are signed up, login pls`,5))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
    dispatch(showMesssage('Great!You logged out!',5))
  }

  const handleLogin = async (credentials) => {
    try {
      dispatch(login(credentials))
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(showMesssage('Great!You logged in!',5))
    } catch (error) {
      console.error(error)
    }

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
