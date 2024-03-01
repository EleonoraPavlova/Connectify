import React, { useCallback } from 'react'
import './index.scss'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks-selectors'
import Typography from '@mui/material/Typography'
import { LogOutTC } from 'src/state/reducers/auth/authReducer'

export const Header = () => {
  let isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  const logOutHandler = useCallback(() => {
    dispatch(LogOutTC())
  }, [isLoggedIn])

  return (
    <header className="header">
      <Logo img="header__img" additionalClass="header__text" />
      {isLoggedIn && (
          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
            {' '}
            {'Hi, name}'}{' '}
          </Typography>
        ) && <Button name={'Log Out'} additionalClass="header__button" callBack={logOutHandler} />}
    </header>
  )
}
