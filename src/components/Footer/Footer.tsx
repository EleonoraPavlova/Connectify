import React from 'react'
import './index.scss'
import { Logo } from 'components/Logo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Footer = () => {
  return (
    <Box className="footer">
      <Typography
        variant="body2"
        sx={{
          flex: '1',
          textAlign: 'center',
          marginLeft: '101.78px',
        }}>
        ® 2023 All rights recerved
      </Typography>
      <Box className="footer__logo">
        <Logo img="footer__img" additionalClass="footer__text" />
      </Box>
    </Box>
  )
}
