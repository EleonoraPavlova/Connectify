import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectUsersTotalCount, usersThunks } from 'BLL/reducers/usersSlice'
import { useAppDispatch } from './selectors'

export function usePaginationsProfile(setName: string, page: number, setCurrentPage: (pageCurr: number) => void) {
  const setPage = () => {
    return sessionStorage.setItem(setName, page.toString())
  }
  const count = 5
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / count)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(usersThunks.setResponseTC({ params: { count, page, friend: true }, isLoader: false }))
    setPage()
  }, [dispatch, page])

  const setCurrentPageHandle = (pageCurr: number) => {
    setCurrentPage(pageCurr)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
