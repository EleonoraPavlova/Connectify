import React from 'react'
import s from './index.module.scss'
import Box from '@mui/material/Box'
import { UserApi } from 'common/types'
import { UserFoto } from 'components/UsersComponents/UserFoto'
import { Typography } from '@mui/material'

type Props = {
  friend: UserApi
}

export const Friend: React.FC<Props> = ({ friend }) => {
  const { photos, name, status } = friend
  const mocStatus = 'My status will be here soon'
  return (
    <Box className={s.friend}>
      <UserFoto link={photos.large} additionalClass={s.friend__foto} />
      <Box>
        <Typography variant="h5" sx={{ fontSize: '15px', fontWeight: 'bold', paddingBottom: '15px' }}>
          {name}
        </Typography>
        <Typography> {status ? status : mocStatus} </Typography>
      </Box>
    </Box>
  )
}
