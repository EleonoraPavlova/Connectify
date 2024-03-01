import React from 'react'
import './index.scss'
import { UsersAll } from 'src/common/UsersComponents/UsersAll/UsersAll'
import { useAppSelector } from 'src/state/hooks/hooks-selectors'
import { RequestStatusType } from 'src/state/reducers/app-reducer/appReducer'
import Typography from '@mui/material/Typography'

export const Friends = () => {
  console.log('Friends')
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
