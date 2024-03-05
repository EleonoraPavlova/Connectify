import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useLogin } from 'state/hooks/useLogin'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'

export const Login = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const { formik, disabled } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <Typography variant="body1" fontWeight="bold" sx={{ paddingTop: '15px' }}>
                To log in get registered
              </Typography>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                autoComplete="email"
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                {...formik.getFieldProps('email')}
              />

              <TextField
                label="Password"
                margin="normal"
                type="password"
                autoComplete="password"
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
              />

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />}
              />
              <Button
                type={'submit'}
                variant={'contained'}
                color={'success'}
                sx={{
                  color: disabled ? '#c2c5cc' : '#008000',
                  border: disabled ? 'none' : '1px solid #008000',
                  backgroundColor: 'transparent',
                  margin: '20px 0',
                }}
                disabled={disabled}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
