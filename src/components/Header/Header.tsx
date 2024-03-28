import React, { useCallback } from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { Button } from 'components/Button'
import { authThunks, selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { selectUserProfile } from 'BLL/reducers/userProfileSlice'
import { useAppDispatch } from 'common/hooks/selectors'
import { Logo } from 'components/Logo'

export const Header = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const name = useSelector(selectUserProfile)
  const dispatch = useAppDispatch()

  const logOutHandler = useCallback(() => {
    dispatch(authThunks.logOutTC())
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
