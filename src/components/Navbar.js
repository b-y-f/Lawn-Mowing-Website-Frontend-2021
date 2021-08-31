import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

export default function Navbar(){
  return(
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/quotes">
          quote history
        </Button>

        <Button color="inherit" component={Link} to="/login">
        logout/in
        </Button>

        <Button color="inherit" component={Link} to="/">
        new quote
        </Button>

        <Button color="inherit" component={Link} to="/signup">
        signup
        </Button>

        {/* <Typography variant="h6" className={classes.title}>
        News
        </Typography> */}
      </Toolbar>

    </AppBar>
  )
}