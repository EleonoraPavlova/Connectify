import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import { FormPosts } from "./FormPosts/FormPosts";
import { Post } from "./Post/Post";
import { PostItem } from "../../state/dataState"
import { UsersInfo } from "../../components/UsersInfo/UsersInfo";
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";


export const Profile = () => {
  const postsData = useSelector<AppRootState, PostItem[]>(state => state.profilePage)

  let posts = postsData.map((post: PostItem) =>
    <Post key={post.id} post={post} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {posts}

  </div>)
}