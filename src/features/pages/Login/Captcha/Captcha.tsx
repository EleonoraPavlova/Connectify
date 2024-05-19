import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { authThunks, selectCaptcha } from 'BLL/reducers/authSlice'
import { FormikErrors, FormikTouched } from 'formik'
import { LoginParams } from 'common/types'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { useActions } from 'common/hooks/useActions'

type FormValues = Pick<LoginParams, 'captcha'>

type Props = {
  formik: {
    touched: FormikTouched<FormValues>
    errors: FormikErrors<FormValues>
    getFieldProps: any
    setFieldValue: any
  }
}

const Captcha: React.FC<Props> = ({ formik }) => {
  const { touched, errors, setFieldValue } = formik
  const captcha = useSelector(selectCaptcha)
  const { getCaptchaUrlTC } = useActions(authThunks)

  const refreshCaptchaHandler = () => {
    getCaptchaUrlTC()
    setFieldValue('captcha', '')
  }

  return (
    <Box>
      <Box sx={{}}>
        {captcha && (
          <Box
            sx={{
              display: 'flex',
              margin: ' 0 auto',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Box component="img" src={captcha} alt="Captcha" sx={{ width: '160px', height: 'auto' }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={{ padding: 0, margin: '7px' }}
                name="captcha"
                label="Captcha"
                margin="normal"
                type="text"
                autoComplete="captcha"
                error={!!(touched.captcha && errors.captcha)}
                inputProps={{
                  style: { padding: '8px 6px' },
                }}
                {...formik.getFieldProps('captcha')}
              />
              <IconButton aria-label="change" size="small" onClick={refreshCaptchaHandler}>
                <ChangeCircleOutlinedIcon color="success" sx={{ opacity: '0.9' }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Captcha
