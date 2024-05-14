import React, { memo } from 'react'
import s from './index.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { UserFoto } from 'components/UsersComponents/UserFoto'
import { UserApi } from 'common/types'
import { Typography } from '@mui/material'

type Props = {
  user: UserApi
  btnTextToggle?: string
  btnTexInfo?: string
  disabled?: boolean
  toggleFollowUser?: () => void
  callBack?: () => void
}

export const User: React.FC<Props> = memo(
  ({ user, btnTextToggle, btnTexInfo, disabled, toggleFollowUser, callBack }) => {
    const { photos, name, followed, id, status } = user

    return (
      <Box className={s.user}>
        <Box className={s.user__box}>
          <UserFoto link={photos.large} additionalClass={s.user__image} />
          <Box className={s.user__data}>
            <Typography variant="h6" className={s.user__name}>
              {name}
            </Typography>
            {followed ? <Typography> Id: {id}</Typography> : null}
            <Typography className={s.user__status}>{status}</Typography>
          </Box>
        </Box>
        <Box className={s.user__buttons}>
          <Button
            className={s.user__button}
            variant="outlined"
            color="success"
            size="small"
            disabled={disabled}
            onClick={toggleFollowUser}>
            {btnTextToggle}
          </Button>
          <Button
            className={s.user__button}
            variant="outlined"
            color="success"
            size="small"
            disabled={disabled}
            onClick={callBack}>
            {btnTexInfo}
          </Button>
        </Box>
      </Box>
    )
  }
)
