import React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
  return (
    <>
      <Stack sx={{ color: 'grey.500', marginX: 'auto', marginY: 'auto' }}>
        <CircularProgress color="success" thickness={2} />
      </Stack>
    </>
  )
}
