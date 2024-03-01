import React from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'
import { RequestStatusType } from 'state/reducers/appSlice/appSlice'
import { useAppSelector } from 'state/hooks/hooks-selectors'
import { UsersAll } from 'common/UsersComponents/UsersAll/UsersAll'

export const Friends = () => {
  let statusApp = useAppSelector<RequestStatusType>((state) => state.app.statusApp)

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
