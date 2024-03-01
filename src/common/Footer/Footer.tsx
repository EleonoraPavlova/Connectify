import React from 'react'
import './index.scss'
import { Logo } from '../Logo/Logo'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export const Footer = () => {
  return (
    <div className="footer">
      <Typography
        variant="body2"
        sx={{
          flex: '1',
          textAlign: 'center',
          marginLeft: '101.78px',
        }}>
        ® 2023 All rights recerved
      </Typography>
      <div className="footer__logo">
        <Logo img="footer__img" additionalClass="footer__text" />
      </div>
    </div>
  )
}
