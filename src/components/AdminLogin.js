import React from 'react'
import { useForm,Controller } from 'react-hook-form'
import adminService from '../services/admin'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function AdminLogin() {
  const classes = useStyles()


  const { handleSubmit, control } = useForm()
  const onSubmit = async data => {
    console.log(data)
    const res = await adminService.login(data)
    if(res){
      alert('ok')
      // dispatch to admin user
    }else{
      alert('wrong')
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}>
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
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}