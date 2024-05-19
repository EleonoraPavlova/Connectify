import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { authThunks, selectCaptcha } from 'BLL/reducers/authSlice'
import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from 'formik'
import { LoginParams } from 'common/types'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { useActions } from 'common/hooks/useActions'
import { LoginError } from '../LoginError/LoginError'

type FormValues = Pick<LoginParams, 'captcha'>

interface Props {
  formik: {
    touched: FormikTouched<LoginParams>
    errors: FormikErrors<LoginParams>
    getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<FormikErrors<FormValues>> | Promise<void>
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
      <Box>
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
            <LoginError formik={formik} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Captcha
