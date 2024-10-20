import s from './footer.module.scss'
import { Logo } from 'components/Logo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Footer = () => {
  return (
    <div className={s.footer}>
      <Typography
        variant="body2"
        sx={{
          flex: '1',
          textAlign: 'center',
          marginLeft: '101.78px',
        }}>
        ® 2023 All rights recerved
      </Typography>
      <Box className={s.logo}>
        <Logo img={s.img} additionalClass={s.text} />
      </Box>
    </div>
  )
}
