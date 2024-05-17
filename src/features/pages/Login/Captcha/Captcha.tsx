import React from 'react'
import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCaptcha } from 'BLL/reducers/authSlice'
import { EditableSpan } from 'components/EditableSpan'

const Captcha = () => {
  const captcha = useSelector(selectCaptcha)
  console.log('captcha', captcha)

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        {captcha && (
          <Box
            component="img"
            src={captcha}
            alt="Captcha"
            sx={{
              width: '200px',
              height: 'auto',
            }}
          />
        )}
      </Grid>
      <Grid item xs={10}>
        <EditableSpan
          title={undefined}
          label={'captcha'}
          editMode={captcha ? true : false}
          onChange={function (title: string): void {
            throw new Error('Function not implemented.')
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Captcha
