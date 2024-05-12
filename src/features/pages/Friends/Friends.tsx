import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { UsersAll } from 'components/UsersComponents/UsersAll'
import { selectAppStatus } from 'BLL/reducers/appSlice'
import { usePaginations } from 'common/hooks/usePaginations'

const Friends = () => {
  let memoPage = sessionStorage.getItem('friends')
  const [currentPage, setCurrentPage] = useState<number>(memoPage ? +memoPage : 1)
  let statusApp = useSelector(selectAppStatus)

  const { pagesCount, setCurrentPageHandle } = usePaginations('friends', currentPage, true, setCurrentPage)

  if (statusApp === 'failed') return null

  return (
    <UsersAll
      btnText="Message"
      pagesCount={pagesCount}
      currentPage={currentPage}
      setCurrentPageHandle={(page) => setCurrentPageHandle(page)}
    />
  )
}
export default Friends
