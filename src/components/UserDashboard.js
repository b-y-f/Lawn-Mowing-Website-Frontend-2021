/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import userService from '../services/user'
import { getAuth, updateProfile } from 'firebase/auth'
import AddBooking from './AddBooking'
import BookingList from './BookingList'
import { setToken } from '../services/token'
import { useDispatch } from 'react-redux'
import { initBooking } from '../reducers/bookingReducer'

// UI
import { Button, Paper } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import AddTaskIcon from '@mui/icons-material/AddTask'

const auth = getAuth()

const paperStyle = {
  minHeight: 600,
  width: 360,
  margin: '20px auto',
  textAlign: 'center'
}

export default function UserDashboard(){
  const { currentUser } = useAuth()
  const dispatch = useDispatch()
  const [openAddBooking,setOpenAddBooking] = useState(false)
  const [showAddButton, setShowAddButton] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const token = await currentUser.getIdToken()
      // console.log(token)
      setToken(token)
      const res = await userService.getAll()
      const { bookings, ...rest } = res

      // console.log(res)

      dispatch(initBooking(bookings))
      window.localStorage.setItem('userInfo', JSON.stringify(rest))

      await updateProfile(
        auth.currentUser, {
          displayName: res.firstName,
          photoURL:res.photoURL
        })
    }
    fetchData()

  },[currentUser, dispatch])

  // console.log(currentUser.photoURL)
  const renderAddBookingButton = () => (
    <Button
      onClick={() => {
        setShowAddButton(false)
        setOpenAddBooking(true)
      }}
      color='success' sx={{ m:2 }}
      variant="contained" endIcon={<AddTaskIcon />}>
      add booking
    </Button>
  )


  const handleHideAddBookingButton = () => {
    setShowAddButton(!showAddButton)
    setOpenAddBooking(!openAddBooking)
  }

  return(
    <div>
      <Paper elevation={3} style={paperStyle}>
        {showAddButton && renderAddBookingButton()}

        <Collapse in={openAddBooking}>
          <AddBooking handleHideAddBookingButton={handleHideAddBookingButton} />
        </Collapse>
        <BookingList />
      </Paper>
    </div>
  )
}