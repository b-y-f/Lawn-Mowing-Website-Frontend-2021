/* eslint-disable no-unused-vars */
import { CssBaseline, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import userService from '../services/user'
import { getAuth, updateProfile } from 'firebase/auth'
import AddBooking from './AddBooking'
import BookingList from './BookingList'
import FilterAndSortBooking from './FilterAndSortBooking'
import { setToken } from '../services/token'
import { useDispatch, useSelector } from 'react-redux'
import { initBooking } from '../reducers/bookingReducer'
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

  const bookings = useSelector(state => state.bookings)
  console.log(bookings)

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

  },[currentUser,dispatch])

  // console.log(currentUser.photoURL)

  return(
    <div style={{ marginTop: 80 }}>
      <Paper elevation={3}  style={paperStyle}>
        <AddBooking />

        <FilterAndSortBooking />

        <BookingList bookings={bookings}/>

      </Paper>
    </div>
  )
}