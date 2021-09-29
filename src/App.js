/* eslint-disable no-unused-vars */
import { React, useEffect } from 'react'
import Login from './components/Login'

import {
  Switch,
  Route,
} from 'react-router-dom'

import Container from '@mui/material/Container'
import AdminDashboard from './components/AdminDashboard'
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
import Zoom from '@mui/material/Zoom'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { Box } from '@mui/system'


const App = ({ props }) => {

  // const dispatch = useDispatch()
  function ScrollTop(props) {
    const { children, window } = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    })

    const handleClick = (event) => {
      console.log('clicked')
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      )

      if (anchor) {
        anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }

    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    )
  }


  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <div id="back-to-top-anchor" />
        <Navbar />

        <Container maxWidth="sm">

          <Switch>
            <PrivateRoute exact path="/" component={UserDashboard} />
            <PrivateRoute path="/profile" component={EditProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <Route path="/admin" component={AdminDashboard} />
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
