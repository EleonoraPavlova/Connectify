import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectUsersTotalCount, usersThunks } from 'BLL/reducers/usersSlice'
import { useAppDispatch } from './selectors'

export function usePaginationsProfile(setName: string, currentPage: number, setCurrentPage: (page: number) => void) {
  const setPage = () => {
    return sessionStorage.setItem(setName, currentPage.toString())
  }
  const pageSize = 5
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / pageSize)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(usersThunks.setResponseTC({ pageSize, currentPage, friend: true, isLoader: true }))
    setPage()
  }, [dispatch, pagesCount, currentPage])

  const setCurrentPageHandle = (page: number) => {
    setCurrentPage(page)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
