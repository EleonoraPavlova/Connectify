import React, { memo } from 'react'
import s from './index.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { UserFoto } from 'components/UsersComponents/UserFoto'
import { UserApi } from 'common/types'
import { Typography } from '@mui/material'

type Props = {
  user: UserApi
  btnText?: string
  toggleFollowUser?: () => void
  sendViewHandler?: () => void
}

export const User: React.FC<Props> = memo(({ user, btnText, toggleFollowUser, sendViewHandler }) => {
  const { photos, name, followed, id, status, followingInProgress } = user
  const disabled = followingInProgress === 'loading'

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
          {followed ? 'Unfollowed' : 'Follow'}
        </Button>
        <Button
          className={s.user__button}
          variant="outlined"
          color="success"
          size="small"
          disabled={disabled}
          onClick={sendViewHandler}>
          {btnText}
        </Button>
      </Box>
    </Box>
  )
})
