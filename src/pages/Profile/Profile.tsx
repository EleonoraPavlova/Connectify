import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";
import dataState, { ProfilePage, PostItem } from "../../state/dataState"
import UsersInfo from "../../components/UsersInfo/UsersInfo";

type ProfileProps = ProfilePage

function Profile(props: ProfileProps) {
  let posts = props.postsData.map((post: PostItem) =>
    <Post key={post.id} post={post} friendsData={dataState.friendsPage.friendsData} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {posts}

  </div>)
}

export default Profile;