import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { showMesssage } from '../reducers/noticeReducer'
import { clearBookings } from '../reducers/bookingReducer'

export default function Navbar({ user }) {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearBookings())
    dispatch(showMesssage('Great!You logged out!',5))
  }

  const LoginOutBtn = () =>
    user ? (
      <Button color="inherit" onClick={() => handleLogout()}>
        logout
      </Button>
    ) : (
      <Button color="inherit" component={Link} to="/login">
        login
      </Button>
    )
  return (
    <AppBar position="static">
      <Toolbar>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/quotes">
              quotes
            </Button>
          </>
        ) : null}
        <LoginOutBtn />

        {!user && (
          <Button color="inherit" component={Link} to="/signup">
            signup
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
