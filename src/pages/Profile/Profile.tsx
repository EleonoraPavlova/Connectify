import React, { useEffect, useState } from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import { FormPosts } from "./FormPosts/FormPosts";
import { PostUserStatus } from "./Post/PostUserStatus";
import { UsersInfo } from "../../common/UsersComponents/UsersInfo/UsersInfo";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { UserApiType } from "src/api/usersApi";
import { PaginationsCustom } from "src/common/PaginationsCustom/PaginationsCustom";
import { setResponseTC } from "src/state/reducers/users/usersReducer";


export const Profile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5
  const totalCount = useAppSelector<number>(state => state.usersPage.totalCount)
  const pagesCount = Math.ceil(totalCount / pageSize)
  const itemsData = useAppSelector<UserApiType[]>(state => state.usersPage.items)

  let status = itemsData.map((i: UserApiType) =>
    <PostUserStatus key={i.id} item={i} />)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setResponseTC(pageSize, currentPage, true));
  }, [dispatch, pagesCount, currentPage])


  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {status}
    <PaginationsCustom pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
  </div>)
}