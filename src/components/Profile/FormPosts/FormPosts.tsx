import React from 'react';
import './index.scss';
import Button from "../../Button/Button";


function FormPosts() {
  return (
    <form className="form-posts" action="#">
      <label htmlFor="posts" className="form-posts__label">My posts</label>
      <textarea className="form-posts__texarea" placeholder="My news...." id="posts" name="posts" />
      < Button />
    </form>)
}

export default FormPosts;