import React from 'react';
import './index.scss';
import Button from "../../../common/Button/Button";


function FormPosts() {
  return (
    <form className="form-posts" action="#">
      <label htmlFor="posts" className="form-posts__label">My posts</label>
      <textarea className="form-posts__texarea" placeholder="My news...." id="posts" name="posts" />
      < Button name="Send" additionalClass="" />
    </form>)
}

export default FormPosts;