import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import UsersInfo from "../../components/UsersInfo/UsersInfo";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";
import { ProfilePage, PostItem } from "../../dataState"

type ProfileProps = ProfilePage

function Profile(props: ProfileProps) {
  let posts = props.postsData.map((post: PostItem) =>
    <Post key={post.id} id={post.id} post={post.post} title={"Post " + post.title} likeCounter={post.likeCounter} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {posts}

  </div>)
}

export default Profile;