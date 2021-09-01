import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

export default function Navbar({ user, handleLogout }) {
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
