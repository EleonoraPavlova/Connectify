import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCaptcha, selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useLogin } from 'common/hooks/useLogin'
import { LoginError } from './LoginError/LoginError'
import Captcha from './Captcha'

const Login = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  let captcha = useSelector(selectCaptcha)
  const { formik, disabled } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }
  console.log('captcha', captcha)
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <Typography variant="body1" fontWeight="bold" sx={{ paddingTop: '15px', color: 'green' }}>
          Free accesss
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <Typography variant="body1" fontWeight="bold" sx={{ paddingTop: '15px' }}>
                Email: free@samuraijs.com
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ paddingTop: '5px' }}>
                Password: free
              </Typography>
            </FormLabel>
            <FormGroup>
              <TextField
                label="email"
                margin="normal"
                autoComplete="email"
                error={!!(formik.touched.email && formik.errors.email)}
                {...formik.getFieldProps('email')}
              />

              <LoginError formik={formik} />

              <TextField
                label="password"
                margin="normal"
                type="password"
                autoComplete="password"
                error={!!(formik.touched.password && formik.errors.password)}
                {...formik.getFieldProps('password')}
              />

              <LoginError formik={formik} />

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />}
              />
              <Captcha />
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
export default Login
