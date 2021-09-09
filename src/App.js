/* eslint-disable no-unused-vars */
import { React, useEffect } from 'react'
import QuoteFrom from './components/BookingForm'
import Login from './components/Login'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
import clientService from './services/client'

import {
  Switch,
  Route,
  Redirect,
  // useRouteMatch
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { showMesssage } from './reducers/noticeReducer'
import QuoteList from './components/QuoteList'
import { sortBookingsByDate } from './helpers/sortHelper'
import { initBookingAll, initBookingById } from './reducers/bookingReducer'
import { setUser } from './reducers/loginReducer'


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const bookings = useSelector(state => state.bookings)
  const sortedBookings = sortBookingsByDate(bookings)

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
    }
    if(user) dispatch(initBookingById(user.id))


  },[dispatch,user])

  const handleCreateUser = async (userObj) => {
    try {
      const res =  await clientService.create(userObj)
      dispatch(showMesssage(`hi ${res.data.name} you are signed up, login pls`,5))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Notification />
      <Navbar user={user} />

      <Container maxWidth="sm">
        <Switch>
          <Route path="/signup">
            <SignupForm handleCreateUser={handleCreateUser} />
          </Route>

          <Route path="/login">
            {user ? <Redirect to={`/clients/${user.id}`} /> : <Login user={user} />}
          </Route>

          <Route path="/quote">
            some quote form
          </Route>

          <Route path="/clients/:id">
            {user ?
              <>
                <QuoteFrom />
                <QuoteList bookings={sortedBookings} />
              </>
              : <Redirect to="/login" />}
          </Route>

          <Route path="/">
            <Redirect to="/login" />
          </Route>

        </Switch>
      </Container>
    </>
  )
}


export default App
