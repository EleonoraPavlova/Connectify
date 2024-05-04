import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectUsersTotalCount, usersThunks } from 'BLL/reducers/usersSlice'
import { useActions } from './useActions'

export function usePaginationsProfile(setName: string, page: number, setCurrentPage: (pageCurr: number) => void) {
  const setPage = () => {
    return sessionStorage.setItem(setName, page.toString())
  }
  const count = 5
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / count)
  const { setResponseTC } = useActions(usersThunks)

  useEffect(() => {
    setResponseTC({ params: { count, page, friend: true }, isLoader: false })
    setPage()
  }, [setResponseTC, page])

  const setCurrentPageHandle = (pageCurr: number) => {
    setCurrentPage(pageCurr)
  }

  return {
    pagesCount,
    setCurrentPageHandle,
  }
}
