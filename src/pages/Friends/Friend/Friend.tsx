import React from 'react'
import './index.scss'
import { UserFoto } from 'src/common/UsersComponents/UserFoto/UserFoto'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { UserApiType } from 'src/api/usersApi'

type FriendProps = {
  friend: UserApiType
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
