import React from 'react'
import { Typography } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { LoginParams } from 'common/types'

type FormValues = Pick<LoginParams, 'email' | 'password'>

type Props = {
  formik: {
    touched: FormikTouched<FormValues>
    errors: FormikErrors<FormValues>
  }
}

export const LoginError = ({ formik }: Props) => {
  const { touched, errors } = formik

  return (
    <>
      {Object.keys(touched).map((field) =>
        touched[field as keyof FormValues] && errors[field as keyof FormValues] ? (
          <Typography key={field} sx={{ color: 'red', margin: '0px', fontSize: '12px', fontWeight: '500' }}>
            {errors[field as keyof FormValues]}
          </Typography>
        ) : null
      )}
    </>
  )
}
