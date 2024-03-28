import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { PostUserStatus } from './Post/PostUserStatus'
import { UserApi } from 'DAL/usersApi'
import { selectUsersItems } from 'state/reducers/usersSlice/usersSlice'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { selectAppInitialized } from 'state/reducers/appSlice/appSlice'
import { usePaginations } from 'state/hooks/usePaginations'
import { UserInfo } from 'common/UsersComponents/UserInfo'
import { Banner } from 'components/Banner'
import { PaginationsCustom } from 'common/PaginationsCustom'
import { FormPosts } from './FormPosts/FormPosts'

export const Profile = () => {
  let memoPage = sessionStorage.getItem('profile')
  const [currentPage, setCurrentPage] = useState<number>(memoPage ? +memoPage : 1)
  const items = useSelector(selectUsersItems)
  let isLoggedIn = useSelector(selectIsLoggedIn)
  let initialized = useSelector(selectAppInitialized)
  const navigate = useNavigate()

  useEffect(() => {}, [isLoggedIn, initialized, navigate])

  const { pagesCount, setCurrentPageHandle } = usePaginations('profile', currentPage, true, setCurrentPage)

  let status = items.map((i: UserApi) => <PostUserStatus key={i.id} item={i} />)

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
