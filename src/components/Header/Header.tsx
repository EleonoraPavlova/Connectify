import React, { useCallback } from 'react'
import './index.scss'
import { Logo } from '../Logo/Logo'
import Typography from '@mui/material/Typography'
import { logOutTC, selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks/selectors'
import { selectUserProfile } from 'state/reducers/userProfileSlice/userProfileSlice'
import { Button } from 'components/Button'

export const Header = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const name = useSelector(selectUserProfile)
  const dispatch = useAppDispatch()

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
  }, [isLoggedIn])

  return (
    <header className="header">
      <Logo img="header__img" additionalClass="header__text" />
      {isLoggedIn && (
        <div className="flex-end">
          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green', margin: '0 20px' }}>
            {name.fullName}
          </Typography>
          <Button name={'Log Out'} additionalClass="header__button" callBack={logOutHandler} />
        </div>
      )}
    </header>
  )
}
