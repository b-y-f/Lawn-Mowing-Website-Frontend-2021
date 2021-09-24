/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import userService from '../services/user'

// style
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link as UILink } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAuth } from '../contexts/AuthContext'

const theme = createTheme()

export default function Signup() {
  const { currentUser } = useAuth()

  const { handleSubmit, register, formState: { errors }, setValue } = useForm()

  // const [userInfo, setUserInfo] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const strUserInfo = window.localStorage.getItem('userInfo')
    const userInfo = JSON.parse(strUserInfo)

    setValue('firstName', userInfo.firstName)
    setValue('lastName', userInfo.lastName)
    setValue('phone',userInfo.phone)
    setValue('email', userInfo.email)
    setValue('lastName', userInfo.lastName)
    setValue('photoURL', userInfo.photoURL)
  },[setValue])



  // console.log(watch())
  const onSubmit = async data => {

    try {
      console.log(data)

      await userService.update({
        firstName:data.firstName,
        lastName:data.lastName,
        phone:data.phone,
        photoURL:data.photoURL
      })
      console.log('profile updated!')
    } catch (err) {
      console.log(err,'ERR')
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.firstName?.type === 'pattern' && true}
                  helperText={errors.firstName?.type === 'pattern' && 'Have to be alphabet.'}
                  {...register('firstName', { pattern: /^[A-Za-z]+$/i })}
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName?.type === 'pattern' && true}
                  helperText={errors.lastName?.type === 'pattern' && 'Have to be alphabet.'}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register('lastName', { pattern: /^[A-Za-z]+$/i })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email?.type === 'pattern' && true}
                  helperText={errors.email?.type === 'pattern' && 'Email is not well formatted.'}
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register('email', { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errors.email?.type === 'minLength' && true}
                  helperText={errors.email?.type === 'minLength' && 'Input at least 6 digit.'}
                  fullWidth
                  id="phone"
                  label="Phone number"
                  {...register('phone', { minLength:6 })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password?.type === 'minLength' && true}
                  helperText={errors.password?.type === 'minLength' && 'At least 6 charactor long.'}
                  fullWidth
                  {...register('password',{ minLength:6 })}
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errors.photoURL?.type === 'pattern' && true}
                  helperText={errors.photoURL?.type === 'pattern' && 'Pls input valid url.'}
                  fullWidth
                  {...register('photoURL',{ pattern: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig })}
                  label="Avatar URL"
                  type="photoURL"
                  id="photoURL"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}