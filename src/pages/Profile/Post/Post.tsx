
import React, { useState } from 'react';
import './index.scss';
import { Friend } from "../../Friends/Friend/Friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { PostItem, FriendItem } from "../../../state/initialState"
import { useSelector } from "react-redux";
import { AppRootStateType } from "src/state/store";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


type PostType = {
  post: PostItem
}


export const Post = ({ post }: PostType) => {
  const friendsData = useSelector<AppRootStateType, FriendItem[]>(state => state.friendsPage)
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

  return (<Box className="post" id={`${post.id}`} >
    <Box className="flex-start">
      {friend ? <Friend friend={friend} /> : null}
      <Box>
        <Typography variant="h6"
          sx={{ fontSize: "15px", paddingBottom: "25px", fontWeight: "bold" }}>
          {post.title}
        </Typography>
        <Typography> {post.post} </Typography>
      </Box>
    </Box>
    <Box className="post__wrap-icon">
      <FontAwesomeIcon icon={faHeart} className={`post__icon ${isHighlighted ? "red" : ""}`} onClick={isHighlightedHandler} />
      <Typography variant="h6" sx={{ fontSize: "12px" }}>{post.likeCounter}</Typography>
    </Box>
  </Box >
  )
}