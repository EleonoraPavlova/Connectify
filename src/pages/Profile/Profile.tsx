import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import UsersInfo from "../../components/UsersInfo/UsersInfo";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";


function Profile() {
  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    <Post title={"Post 1"} post={'There is a post 1 here...'} />
    <Post title={"Post 2"} post={'There is a post 2 here...'} />
    <Post title={"Post 3"} post={'There is a post 3 here...'} />
    <Post title={"Post 4"} post={'There is a post 4 here...'} />
  </div>)
}

export default Profile;