import React, { useEffect, useState } from 'react'
import './index.scss'
import Banner from '../../components/Banner/Banner'
import { FormPosts } from './FormPosts/FormPosts'
import { PostUserStatus } from './Post/PostUserStatus'
import { useAppDispatch } from 'state/hooks/hooks-selectors'
import { UserApi } from 'api/usersApi'
import { selectUsersItems, selectUsersTotalCount, setResponseTC } from 'state/reducers/usersSlice/usersSlice'
import { UserInfo } from 'common/UsersComponents/UsersInfo/UserInfo'
import { PaginationsCustom } from 'common/PaginationsCustom/PaginationsCustom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'
import { useNavigate } from 'react-router-dom'
import { selectAppInitialized } from 'state/reducers/appSlice/appSlice'

export const Profile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5
  const totalCount = useSelector(selectUsersTotalCount)
  const pagesCount = Math.ceil(totalCount / pageSize)
  const items = useSelector(selectUsersItems)
  let isLoggedIn = useSelector(selectIsLoggedIn)
  let initialized = useSelector(selectAppInitialized)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn && initialized) navigate('/login')
  }, [isLoggedIn, initialized, navigate])

  useEffect(() => {
    dispatch(setResponseTC({ pageSize, currentPage, friend: true, isLoader: true }))
  }, [dispatch, pagesCount, currentPage])

  let status = items.map((i: UserApi) => <PostUserStatus key={i.id} item={i} />)

  return (
    <div className="content">
      <Banner />
      <UserInfo />
      <FormPosts />
      {status}
      <PaginationsCustom pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
