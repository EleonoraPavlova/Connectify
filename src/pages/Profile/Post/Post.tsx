
import React, { useState } from 'react';
import './index.scss';
import Friend from "../../../pages/Friends/Friend/Friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { PostItem, FriendItem } from "../../../state/dataState"


type PostType = {
  post: PostItem
  friendsData: FriendItem[]
}


function Post({ post, friendsData }: PostType) {
  let [isHighlighted, setisHighlighted] = useState<boolean>(false)

  const isHighlightedHandler = () => {
    if (!isHighlighted) {
      post.likeCounter += 1
      return setisHighlighted(true)
    } else {
      post.likeCounter -= 1
      return setisHighlighted(false)
    }
  }

  let friend = friendsData.find(f => f.id === post.authorId)

  return (<div className="post" id={`${post.id}`} >
    <div className="flex-start">
      {friend ? <Friend friend={friend} /> : null}
      <div>
        <h6 className="post__header"> Post  {post.title} </h6>
        <p> {post.post} </p>
      </div>
    </div>
    <div className="post__wrap-icon">
      <FontAwesomeIcon icon={faHeart} className={`post__icon ${isHighlighted ? "red" : ""}`} onClick={isHighlightedHandler} />
      <p className="post__icon-counter">{post.likeCounter}</p>
    </div>
  </div >
  )
}

export default Post;
