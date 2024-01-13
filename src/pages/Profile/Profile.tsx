import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import { FormPosts } from "./FormPosts/FormPosts";
import { PostUserStatus } from "./Post/PostUserStatus";
import { UsersInfo } from "../../common/UsersComponents/UsersInfo/UsersInfo";
import { useAppSelector } from "src/state/hooks/hooks-selectors";
import { UserApiType } from "src/api/usersApi";


export const Profile = () => {
  // const postsData = useAppSelector<PostItem[]>(state => state.profilePage)

  // let posts = postsData.map((post: PostItem) =>
  //   <Post key={post.id} post={post} />)

  const itemsData = useAppSelector<UserApiType[]>(state => state.usersPage.items)

  let status = itemsData.map((i: UserApiType) =>
    <PostUserStatus key={i.id} item={i} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {status}
  </div>)
}