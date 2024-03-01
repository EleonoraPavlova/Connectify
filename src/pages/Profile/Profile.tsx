import React, { useEffect, useState } from 'react'
import './index.scss'
import Banner from '../../components/Banner/Banner'
import { FormPosts } from './FormPosts/FormPosts'
import { PostUserStatus } from './Post/PostUserStatus'
import { useAppDispatch, useAppSelector } from 'state/hooks/hooks-selectors'
import { UserApiType } from 'api/usersApi'
import { setResponseTC } from 'state/reducers/users/usersReducer'
import { UserInfo } from 'common/UsersComponents/UsersInfo/UserInfo'
import { PaginationsCustom } from 'common/PaginationsCustom/PaginationsCustom'

export const Profile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5
  const totalCount = useAppSelector<number>((state) => state.usersPage.totalCount)
  const pagesCount = Math.ceil(totalCount / pageSize)
  const itemsData = useAppSelector<UserApiType[]>((state) => state.usersPage.items)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setResponseTC(pageSize, currentPage, true))
  }, [dispatch, pagesCount, currentPage])

  let status = itemsData.map((i: UserApiType) => <PostUserStatus key={i.id} item={i} />)

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
