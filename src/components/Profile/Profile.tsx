import React from 'react';
import './index.scss';
import Banner from "../Banner/Banner";
import UsersInfo from "../UsersInfo/UsersInfo";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";


function Profile() {
  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>)
}

export default Profile;