import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import userService from '../services/user'
import { useDispatch } from 'react-redux'
import { showMessage } from '../reducers/noticeReducer'

// style
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import Checkbox from '@mui/material/Checkbox'
import { Link as UILink } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAuth } from '../contexts/AuthContext'

const theme = createTheme()

export default function Signup() {
  const dispatch = useDispatch()
  const { signup } = useAuth()

  const { handleSubmit, register, formState: { errors } } = useForm()

  const history = useHistory()


  // console.log(watch())
  const onSubmit = async data => {

    try {
      // console.log(data.email, data.password)
      const res = await signup(data.email, data.password)

      await userService.create({
        uid: res.user.uid,
        email:data.email,
        firstName:data.firstName,
        lastName:data.lastName
      })
      dispatch(showMessage({ type:'success',text:'Sign up successful!' },5))
      // console.log('signup ok',res)
      history.push('/')
    } catch (err) {
      dispatch(showMessage({ type:'error',text:'The email address is already in use by another account.' },5))
      // console.log(err)
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.firstName?.type === 'pattern' && true}
                  helperText={errors.firstName?.type === 'pattern' && 'Have to be alphabet.'}
                  {...register('firstName', { required: true, pattern: /^[A-Za-z]+$/i })}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName?.type === 'pattern' && true}
                  helperText={errors.lastName?.type === 'pattern' && 'Have to be alphabet.'}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/i })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email?.type === 'pattern' && true}
                  helperText={errors.email?.type === 'pattern' && 'Email is not well formatted.'}
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register('email', { required:true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password?.type === 'minLength' && true}
                  helperText={errors.password?.type === 'minLength' && 'At least 6 characters long.'}
                  fullWidth
                  {...register('password',{ required:true, minLength:6 })}
                  label="Password"
                  type="password"
                  id="password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <UILink variant="body2">
                  Already have an account? Sign in
                  </UILink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}