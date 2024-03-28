import { UsersAll } from 'components/UsersComponents/UsersAll'
import React, { useState } from 'react'
import { usePaginations } from 'state/hooks/usePaginations'

export const Users = () => {
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
