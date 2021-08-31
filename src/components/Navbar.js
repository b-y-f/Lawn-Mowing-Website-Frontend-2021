import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

export default function Navbar({ user }){
  return(
    <AppBar position="static">
      <Toolbar>

        {user
          ?(
            <>
              <Button color="inherit" component={Link} to="/">
                new quote
              </Button>
              <Button color="inherit" component={Link} to="/quotes">
          quote history
              </Button>
            </>
          )
          :null
        }
        <Button color="inherit" component={Link} to="/login">
          {user? 'logout':'login'}
        </Button>

        {!user &&<Button color="inherit" component={Link} to="/signup">
        signup
        </Button>}


      </Toolbar>

    </AppBar>
  )
}