import { selectUsersTotalCount, setResponseTC } from 'state/reducers/usersSlice/usersSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { useAppDispatch } from './selectors'

export function usePaginations(
  setName: string,
  currentPage: number,
  friend: boolean,
  setCurrentPage: (page: number) => void
) {
  const setPage = () => {
    return sessionStorage.setItem(setName, currentPage.toString())
  }
  const pageSize = 15
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / pageSize)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn) dispatch(setResponseTC({ pageSize, currentPage, friend }))
    setPage()
  }, [dispatch, currentPage, friend, isLoggedIn])

  const setCurrentPageHandle = (page: number) => {
    setCurrentPage(page)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
