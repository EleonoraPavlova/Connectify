import React from 'react';
import './index.scss';
import Banner from "../Banner/Banner";
import UsersInfo from "../UsersInfo/UsersInfo";



function MainContent() {
  return (<div className="content">
    <Banner />
    < UsersInfo />
    <form className="content-posts" action="#">
      <label htmlFor="posts" className="content-posts-label">My posts</label>
      <textarea className="content-posts-texarea" placeholder="My news...." id="posts" name="posts" />
      <div className="flex-end"><input className="content-posts-send" type="submit" value="Send" /></div>
    </form>
    <div className="content-wall">
      <h6 className="content-wall-header">Post 1</h6>
      <p>There is a post here....</p>
    </div>
  </div>)
}

export default MainContent;