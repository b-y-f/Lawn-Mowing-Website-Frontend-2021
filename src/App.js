/* eslint-disable no-unused-vars */
import { React } from 'react'
import Login from './components/Login'

import {
  Switch,
  Route,
} from 'react-router-dom'


import Container from '@mui/material/Container'

import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import ForgotPassword from './components/ForgotPassword'
import UserDashboard from './components/UserDashboard'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import EditProfile from './components/EditProfile'
import { CssBaseline } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Fab from '@mui/material/Fab'
import ScrollTop from './components/ScrollTop'
import Page404 from './components/Page404'



const App = ({ props }) => {

  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <div id="back-to-top-anchor" />
        <Navbar />

        <Container maxWidth="sm" style={{ marginTop: 80 }}>

          <Switch>
            <PrivateRoute exact path="/" component={UserDashboard} />
            <PrivateRoute path="/profile" component={EditProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/*" component={Page404} />
          </Switch>

          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>

        </Container>
      </AuthProvider>
    </>
  )
}


export default App
