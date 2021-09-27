import { React, useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'

import {
  Switch,
  Route,
} from 'react-router-dom'

import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import AdminDashboard from './components/AdminDashboard'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import ForgotPassword from './components/ForgotPassword'
import UserDashboard from './components/UserDashboard'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import EditProfile from './components/EditProfile'

const App = () => {

  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin)

  useEffect(() => {

  },[dispatch,admin])


  return (
    <>
      <AuthProvider>
        <Navbar />
        <Notification />

        <Container maxWidth="sm">

          <Switch>
            <PrivateRoute exact path="/" component={UserDashboard} />
            <PrivateRoute path="/profile" component={EditProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <Route path="/admin" component={AdminDashboard} />
          </Switch>


        </Container>
      </AuthProvider>
    </>
  )
}


export default App
