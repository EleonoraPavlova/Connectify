
import React, { useState } from 'react';
import './index.scss';
import { Friend } from "../../Friends/Friend/Friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserApiType } from "src/api/usersApi";
import { useAppDispatch } from "src/state/hooks/hooks-selectors";
import { decreaseLikeCounterAC, increaseLikeCounterAC } from "src/state/reducers/users/usersReducer";


type PostUserStatusType = {
  item: UserApiType
}

export const PostUserStatus: React.FC<PostUserStatusType> = ({ item }) => {
  let [isHighlighted, setisHighlighted] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const isHighlightedHandler = () => {
    if (!isHighlighted) {
      dispatch(increaseLikeCounterAC(item.id))
      return setisHighlighted(true)
    } else {
      dispatch(decreaseLikeCounterAC(item.id))
      return setisHighlighted(false)
    }
  }

  return (
    item.followed ? <Box className="post" id={`${item.id}`} >
      <Box className="flex-start">
        <Friend friend={item} />
      </Box>
      <Box className="post__wrap-icon">
        <FontAwesomeIcon icon={faHeart} className={`post__icon ${isHighlighted ? "red" : ""}`} onClick={isHighlightedHandler} />
        <Typography variant="h6" sx={{ fontSize: "12px" }}>{item.likeCounter}</Typography>
      </Box>
    </Box > : null)
}