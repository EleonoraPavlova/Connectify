import React, { useCallback } from 'react'
import './index.scss'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import Typography from '@mui/material/Typography'
import { logOutTC, selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks/selectors'
import { selectUserProfile } from 'state/reducers/userProfileSlice/userProfileSlice'

export const Header = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const name = useSelector(selectUserProfile).fullName
  const dispatch = useAppDispatch()

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
  }, [isLoggedIn])

  return (
    <header className="header">
      <Logo img="header__img" additionalClass="header__text" />
      {isLoggedIn && (
          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
            {name}
          </Typography>
        ) && <Button name={'Log Out'} additionalClass="header__button" callBack={logOutHandler} />}
    </header>
  )
}
