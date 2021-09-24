/* eslint-disable no-unused-vars */
import { CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import userService from '../services/user'
import { getAuth, updateProfile } from 'firebase/auth'
const auth = getAuth()

export default function UserDashboard(){
  const { currentUser } = useAuth()

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    async function fetchData() {
      const token = await currentUser.getIdToken()
      // console.log(token)
      userService.setToken(token)
      const res = await userService.getAll()
      const { bookings, ...rest } = res

      console.log(res)

      setBookings(bookings)
      window.localStorage.setItem('userInfo', JSON.stringify(rest))

      await updateProfile(
        auth.currentUser, {
          displayName: res.firstName,
          photoURL:res.photoURL
        })
    }
    fetchData()

  },[currentUser])

  console.log(currentUser.photoURL)

  return(
    <div>
      <CssBaseline />
      <h2>User Dash</h2>
      <p>{currentUser.email}</p>

    </div>
  )
}