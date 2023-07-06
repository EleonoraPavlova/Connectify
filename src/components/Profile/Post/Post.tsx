
import React from 'react';
import './index.scss';
import UserFoto from "../../UsersInfo/UserFoto/UserFoto";



function Post() {
  return (<div className="post flex-start">
    <UserFoto />
    <div>
      <h6 className="post__header">Post 1</h6>
      <p>There is a post here....</p>
    </div>
  </div>
  )
}

export default Post;
