import React, { ChangeEvent, useState } from 'react';
import './index.scss';
import Button from "../../../common/Button/Button";
import dataState, { PostItem } from "../../../state/dataState"
import { v1 } from "uuid";

type FormPostsType = {
  addPostHandler: (post: PostItem) => void;
}

function FormPosts(props: FormPostsType) {
  let [textValue, setTextValue] = useState<string>("")

  const addPostHandler = (textValue: string) => {
    let newPost = {
      title: "One Title",
      id: v1(),
      post: textValue,
      likeCounter: Math.floor(Math.random() * 100),
      authorId: dataState.friendsPage.friendsData[2].id,
    }
    props.addPostHandler(newPost)
    setTextValue("")
  }

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value)
  }

  return (
    <div className="form-posts">
      <label htmlFor="posts" className="form-posts__label">My posts</label>
      <textarea minLength={10} className="form-posts__texarea"
        placeholder="My news...." id="posts" name="posts" value={textValue}
        onChange={onChangeHandler} />
      <div className="flex-end">
        < Button callBack={() => addPostHandler(textValue)} name="Send" additionalClass="form-posts__button" />
      </div>
    </div>)
}

export default FormPosts;