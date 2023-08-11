import React, { useState } from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";
import dataState, { ProfilePage, PostItem } from "../../state/dataState"
import UsersInfo from "../../components/UsersInfo/UsersInfo";

type ProfileProps = ProfilePage

function Profile(props: ProfileProps) {
  let [arrPosts, setArrPosts] = useState<PostItem[]>(dataState.profilePage.postsData)

  let posts = arrPosts.map((post: PostItem) =>
    <Post key={post.id} post={post} friendsData={dataState.friendsPage.friendsData} />)

  const addPost = (post: PostItem) => {
    setArrPosts([post, ...arrPosts])
  }

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts addPostHandler={addPost} />
    {posts}

  </div>)
}

export default Profile;