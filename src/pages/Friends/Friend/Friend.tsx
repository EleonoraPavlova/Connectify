import React from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { UserApi } from 'api/usersApi'
import { UserFoto } from 'common/UsersComponents/UserFoto/UserFoto'

type FriendProps = {
  friend: UserApi
}

export const Friend = ({ friend }: FriendProps) => {
  const mocPhoto = 'https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg'
  const mocStatus = 'My status will be here soon'
  return (
    <Box className="friend">
      <UserFoto link={friend.photos.small ? friend.photos.small : mocPhoto} additionalClass="friend__foto" />
      <Box>
        <Typography variant="h5" sx={{ fontSize: '15px', fontWeight: 'bold', paddingBottom: '15px' }}>
          {' '}
          {friend.name}{' '}
        </Typography>
        <Typography> {friend.status ? friend.status : mocStatus} </Typography>
      </Box>
    </Box>
  )
}
