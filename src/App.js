/* eslint-disable no-unused-vars */
import { React, useEffect } from 'react'
import QuoteFrom from './components/BookingForm'
import Login from './components/Login'
import Notification from './components/Notification'
// import clientService from './services/client'

import {
  Switch,
  Route,
  Redirect,
  // useRouteMatch
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
// import { showMesssage } from './reducers/noticeReducer'
import QuoteList from './components/BookingList'
import { sortBookingsByDate } from './helpers/sortHelper'
import { initBookingAll, initBookingById } from './reducers/bookingReducer'
import { logout, setUser } from './reducers/loginReducer'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import ForgotPassword from './components/ForgotPassword'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const bookings = useSelector(state => state.bookings)
  const admin = useSelector(state => state.admin)
  const sortedBookings = sortBookingsByDate(bookings)

  if(admin) dispatch(logout())

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(initBookingById(user.id))
    }

    if(admin) dispatch(initBookingAll())
  },[dispatch,admin])

  // const handleCreateUser = async (userObj) => {
  //   try {
  //     const res =  await clientService.create(userObj)
  //     dispatch(showMesssage(`hi ${res.data.name} you are signed up, login pls`,5))
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <AuthProvider>
        <Notification />
        <Navbar user={user} />

        <Container maxWidth="sm">

          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <Route path="/admin/login">
              {admin?<Redirect to="/admin" />:<AdminLogin />}
            </Route>

            <Route path="/admin" component={AdminDashboard}>
              {admin? <AdminDashboard bookings={bookings} />: <Redirect to="admin/login" />}
            </Route>

            <Route path="/quote">
            some quote form
            </Route>

            <Route path="/clients/:id">
              {user ?
                <>
                  <QuoteFrom user={user}/>
                  <QuoteList bookings={sortedBookings} />
                </>
                : <Redirect to="/login" />}
            </Route>

            <Route path="/">
              <Redirect to="/login" />
            </Route>

          </Switch>


        </Container>
      </AuthProvider>
    </>
  )
}


export default App
