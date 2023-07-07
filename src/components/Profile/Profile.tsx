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
    <Post title={"Post 1"} />
    <Post title={"Post 2"} />
    <Post title={"Post 3"} />
    <Post title={"Post 4"} />
    <Post title={"Post 5"} />
  </div>)
}

export default Profile;