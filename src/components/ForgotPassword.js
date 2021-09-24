/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

// style
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

export default function ForgotPassword() {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const { forgotPassword } = useAuth()

  const history = useHistory()

  // console.log(watch())
  const onSubmit = async data => {

    try {
      const res = await forgotPassword(data.email)
      console.log('ok',res)
      history.push('/')
    } catch (err) {
      console.log(err)
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
            Reset password
          </Typography>
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

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              reset password
            </Button>



          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}