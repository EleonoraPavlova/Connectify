
import React from 'react';
import './index.scss';
import UserFoto from "../../../components/UsersInfo/UserFoto/UserFoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';


type PostTitleType = {
  title: string
  post: string
  id: string
}

function Post(props: PostTitleType) {
  return (<div className="post" id={props.id}>
    <div className="flex-start">
      <UserFoto link={"https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"} />
      <div>
        <h6 className="post__header">{props.title}</h6>
        <p>{props.post}</p>
      </div>
    </div>
    <FontAwesomeIcon icon={faHeart} className="post__icon" />
  </div>
  )
}

export default Post;
