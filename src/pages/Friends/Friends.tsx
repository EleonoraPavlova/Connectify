import React, { useState } from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { selectAppStatus } from 'state/reducers/appSlice/appSlice'
import { usePaginations } from 'state/hooks/usePaginations'
import { UsersAll } from 'components/UsersComponents/UsersAll'

export const Friends = () => {
  let memoPage = sessionStorage.getItem('friends')
  const [currentPage, setCurrentPage] = useState<number>(memoPage ? +memoPage : 1)
  let statusApp = useSelector(selectAppStatus)

  const { pagesCount, setCurrentPageHandle } = usePaginations('friends', currentPage, true, setCurrentPage)

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

  return (
    <UsersAll
      btnText="Message"
      pagesCount={pagesCount}
      currentPage={currentPage}
      setCurrentPageHandle={(page) => setCurrentPageHandle(page)}
    />
  )
}
