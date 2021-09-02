import { React, useEffect } from 'react'
import QuoteFrom from './components/BookingForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
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
import QuoteList from './components/QuoteList'
import { initBooking } from './reducers/bookingReducer'
import { sortBookingsByDate } from './helpers/sortHelper'


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const bookings = useSelector(state => state.bookings)
  const sortedBookings = sortBookingsByDate(bookings)

  useEffect(() => {
    dispatch(initBooking())
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      dispatch(setUser(loggedUserJSON))
    }

  }, [dispatch])

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

            {user ?
              <>
                <QuoteFrom />
                <QuoteList bookings={sortedBookings} />
              </>
              : <Redirect to="/login" />}

          </Route>

          <Route path="/">
            {user ? <Redirect to="/quotes" /> : <QuoteFrom/>}
          </Route>

        </Switch>
      </Container>

    </Router>
  )
}


export default App
