import { Typography } from '@mui/material'
import React from 'react'

export const NotFound = () => {
  return (
    <Typography
      variant="h5"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c2c5cc',
      }}>
      404: PAGE NOT FOUND
    </Typography>
  )
}
