import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectUsersTotalCount, usersThunks } from 'BLL/reducers/usersSlice'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useAppDispatch } from './selectors'

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
  const dispatch = useAppDispatch()

  const getUsers = (page: number) => {
    dispatch(usersThunks.setResponseTC({ params: { count, page, friend }, isLoader: false }))
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUsers(page)
    }
  }, [isLoggedIn])

  const setCurrentPageHandle = (pageCurr: number) => {
    sessionStorage.setItem(setName, page.toString())
    setCurrentPage(pageCurr)
    getUsers(pageCurr)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
