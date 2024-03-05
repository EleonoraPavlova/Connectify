import React from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'
import { UsersAll } from 'common/UsersComponents/UsersAll/UsersAll'
import { useSelector } from 'react-redux'
import { selectAppStatus } from 'state/reducers/appSlice/appSlice'

export const Friends = () => {
  let statusApp = useSelector(selectAppStatus)

  if (statusApp === 'failed') {
    return (
      <Typography
        variant="h3"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c2c5cc',
        }}>
        You're not authorization
      </Typography>
    )
  }

  return <UsersAll friend={true} btnTextInfo="Message" />
}
