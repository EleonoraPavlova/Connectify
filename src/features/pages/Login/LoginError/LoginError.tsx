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

  const errorMessages = Object.keys(touched)
    .filter((field) => touched[field as keyof FormValues] && errors[field as keyof FormValues])
    .map((field) => errors[field as keyof FormValues])

  return (
    <>
      {errorMessages.length > 0 && (
        <Typography sx={{ color: 'red', margin: '0px', fontSize: '12px', fontWeight: '500' }}>
          {errorMessages[0]}
        </Typography>
      )}
    </>
  )
}
