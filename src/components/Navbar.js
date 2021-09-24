import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'


import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu'
import { Avatar, IconButton, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'


export default function Navbar() {

  const { currentUser,logout } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const history = useHistory()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    setAnchorEl(null)
    history.push('/profile')

  }

  async function handleLogout(){
    setAnchorEl(null)
    try {
      await logout()
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography onClick={() => history.push('/')} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookings
          </Typography>

          {currentUser && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {currentUser?.photoURL
                    ? <Avatar src={currentUser.photoURL} />
                    : <Avatar>
                      {currentUser?.displayName.charAt(0).toUpperCase()}
                    </Avatar>}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem onClick={handleProfile}>
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
