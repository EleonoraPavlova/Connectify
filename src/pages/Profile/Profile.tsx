import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import UsersInfo from "../../components/UsersInfo/UsersInfo";
import FormPosts from "./FormPosts/FormPosts";
import Post from "./Post/Post";



function Profile() {
  let postsData = [
    { id: 1, title: '1', post: 'There is a post 1 here...', likeCounter: 12 },
    { id: 2, title: '2', post: 'There is a post 2 here...', likeCounter: 12 },
    { id: 3, title: '3', post: 'There is a post 3 here...', likeCounter: 12 },
    {
      id: 4, title: '4', post: 'There is a post 4 here...', likeCounter: 12
    },
    { id: 5, title: '5', post: 'There is a post 4 here...', likeCounter: 12 },
    { id: 6, title: '6', post: 'There is a post 4 here...', likeCounter: 12 },
    { id: 7, title: '7', post: 'There is a post 7 here...', likeCounter: 12 },
  ]


  let posts = postsData.map(post => <Post key={post.id} id={post.id} post={post.post} title={"Post " + post.title} counter={post.likeCounter} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {posts}

  </div>)
}

export default Profile;