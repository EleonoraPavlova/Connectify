import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectUsersTotalCount, usersThunks } from 'BLL/reducers/usersSlice'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useActions } from './useActions'

export function usePaginations(
  setName: string,
  page: number,
  friend: boolean,
  setCurrentPage: (pageCurr: number) => void
) {
  const count = 15
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / count)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { setResponseTC } = useActions(usersThunks)

  const getUsers = (page: number) => {
    setResponseTC({ params: { count, page, friend } })
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUsers(page)
    }
  }, [isLoggedIn])

  const setCurrentPageHandle = (pageCurr: number) => {
    sessionStorage.setItem(setName, pageCurr.toString())
    setCurrentPage(pageCurr)
    getUsers(pageCurr)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
