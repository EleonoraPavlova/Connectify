import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import s from './header.module.scss'
import { Button } from 'components/Button'
import { authThunks, selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { selectUserProfile } from 'BLL/reducers/userProfileSlice'
import { Logo } from 'components/Logo'
import { Typography } from '@mui/material'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { useActions } from 'common/hooks/useActions'
import clsx from 'clsx'

export const Header = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const profile = useSelector(selectUserProfile)
  const meId = useSelector(selectAppMeId)
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [isLoggedIn])

  const cn = {
    header: s.header,
    logo: s.logo,
    text: s.text,
    wrapperLogo: clsx(s.wrapperLogo, 'flex-end'),
    button: s.button,
  }

  return (
    <header className={cn.header}>
      <Logo img={cn.logo} additionalClass={cn.text} />
      {isLoggedIn && (
        <div className={cn.wrapperLogo}>
          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>
            {profile.userId === meId ? profile.fullName : null}
          </Typography>
          <Button className={cn.button} onClick={logOutHandler}>
            Log Out
          </Button>
        </div>
      )}
    </header>
  )
}
