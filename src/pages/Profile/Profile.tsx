import React, { useEffect, useState } from 'react'
import './index.scss'
import Banner from '../../components/Banner/Banner'
import { FormPosts } from './FormPosts/FormPosts'
import { PostUserStatus } from './Post/PostUserStatus'
import { UserApi } from 'api/usersApi'
import { selectUsersItems } from 'state/reducers/usersSlice/usersSlice'
import { UserInfo } from 'common/UsersComponents/UsersInfo/UserInfo'
import { PaginationsCustom } from 'common/PaginationsCustom/PaginationsCustom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { useNavigate } from 'react-router-dom'
import { selectAppInitialized } from 'state/reducers/appSlice/appSlice'
import { usePaginations } from 'state/hooks/usePaginations'

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
