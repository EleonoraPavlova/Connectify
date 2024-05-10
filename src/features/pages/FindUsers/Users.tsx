import React, { useState } from 'react'
import { usePaginations } from 'common/hooks/usePaginations'
import { UsersAll } from 'components/UsersComponents/UsersAll'

const Users = () => {
  let memoPage = sessionStorage.getItem('users')
  const [currentPage, setCurrentPage] = useState<number>(memoPage ? +memoPage : 1)

  const { pagesCount, setCurrentPageHandle } = usePaginations('users', currentPage, false, setCurrentPage)

  return (
    <UsersAll
      btnText={'Full info'}
      pagesCount={pagesCount}
      currentPage={currentPage}
      setCurrentPageHandle={(page) => setCurrentPageHandle(page)}
    />
  )
}
export default Users
