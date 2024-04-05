import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { UserInfo } from 'components/UsersComponents/UserInfo'
import { Banner } from 'components/Banner'
import { PaginationsCustom } from 'components/PaginationsCustom'
import { Post } from './Post'
import { UserApi } from 'common/types'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { selectAppInitialized, selectAppStatus } from 'BLL/reducers/appSlice'
import { selectUsersItems } from 'BLL/reducers/usersSlice'
import { usePaginations } from 'common/hooks/usePaginations'
import { FormPosts } from './FormPosts'

export const Profile = () => {
  let memoPage = sessionStorage.getItem('profile')
  const [currentPage, setCurrentPage] = useState<number>(memoPage ? +memoPage : 1)
  const items = useSelector(selectUsersItems)
  let isLoggedIn = useSelector(selectIsLoggedIn)
  let initialized = useSelector(selectAppInitialized)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn && initialized) navigate('/login')
  }, [isLoggedIn, initialized, navigate])

  const { pagesCount, setCurrentPageHandle } = usePaginations('profile', currentPage, true, setCurrentPage)

  let status = items.map((i: UserApi) => <Post key={i.id} item={i} />)

  return (
    <div className="content">
      <Banner />
      <UserInfo />
      <FormPosts />
      {status}
      <PaginationsCustom pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPageHandle} />
    </div>
  )
}
