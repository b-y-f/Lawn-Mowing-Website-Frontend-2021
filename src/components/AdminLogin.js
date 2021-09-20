import React from 'react'
import { useForm,Controller } from 'react-hook-form'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/adminReducer'



export default function AdminLogin() {

  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm()
  const onSubmit = data => {
    dispatch(login(data))
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="">
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete="email"
                autoFocus
              />}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
              />}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}