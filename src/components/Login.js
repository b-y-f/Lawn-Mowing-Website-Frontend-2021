/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { Link as RouterLink ,useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showMessage } from '../reducers/noticeReducer'


// style
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControlLabel,Link } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

// service
import userService from '../services/user'

const theme = createTheme()

export default function Login() {

  const dispatch = useDispatch()

  const { handleSubmit, register, formState: { errors } } = useForm()

  const { login,signInWithGoogleAccount } = useAuth()

  const history = useHistory()


  // console.log(watch())
  const onSubmit = async data => {

    try {
      const res = await login(data.email, data.password)
      console.log('login good!',res)
      dispatch(showMessage({ type:'success',text:'login good!' },5))
      history.push('/')
    } catch (err) {
      dispatch(showMessage({ type:'error',text:'The password is invalid or the user does not have a password.' },5))
      // console.log(err)
    }
  }

  const handleSignInWithGoogleAccount = async() => {
    try {
      const res = await signInWithGoogleAccount()
      // console.log(res)
      if(res.additionalUserInfo.isNewUser){
        console.log('isNewUser')

        const userInfo = res.additionalUserInfo.profile
        await userService.create({
          uid: res.user.uid,
          email:userInfo.email,
          firstName:userInfo.given_name,
          lastName:userInfo.family_name,
        })
      }

      dispatch(showMessage({ type:'success',text:'login good!' },5))
      history.push('/')

    } catch (error) {
      console.log(error)
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Button onClick={handleSignInWithGoogleAccount} variant="outlined" startIcon={<GoogleIcon />}>
            Login with Google
          </Button>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

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

                <Link component={RouterLink} to="/forgot-password">
                  Forgot Password?
                </Link>

              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup">
                Need an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}