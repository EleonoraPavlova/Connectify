import React, { ChangeEvent, useState } from 'react';
import './index.scss';
import Button from "../../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePostAC, addPostAC } from "src/reducers/profile/profilePageReducer";
import { AppRootState } from "src/state/store";
import { PostItem } from "src/state/dataState";

// type FormPostsType = {
//   // addPostHandler: (post: string) => void;
// }

export const FormPosts = () => {
  let [textValue, setTextValue] = useState<string>("")
  const dispatch = useDispatch()

  const addPostHandler = (textValue: string) => {
    dispatch(addPostAC(textValue))
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
        <Button callBack={() => addPostHandler(textValue)} name="Send" additionalClass="form-posts__button" />
      </div>
    </div>)
}