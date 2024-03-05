import React, { useState } from 'react'
import './index.scss'
import { Friend } from '../../Friends/Friend/Friend'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { UserApi } from 'api/usersApi'
import { decreaseLikeCounterAC, increaseLikeCounterAC } from 'state/reducers/usersSlice/usersSlice'
import { useAppDispatch } from 'state/hooks/hooks-selectors'

type PostUserStatusType = {
  item: UserApi
}

export const PostUserStatus: React.FC<PostUserStatusType> = ({ item }) => {
  const { id, followed, likeCounter } = item
  let [isHighlighted, setisHighlighted] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const isHighlightedHandler = () => {
    if (!isHighlighted) {
      dispatch(increaseLikeCounterAC({ userId: id }))
      return setisHighlighted(true)
    } else {
      dispatch(decreaseLikeCounterAC({ userId: id }))
      return setisHighlighted(false)
    }
  }

  return followed ? (
    <Box className="post" id={`${id}`}>
      <Box className="flex-start">
        <Friend friend={item} />
      </Box>
      <Box className="post__wrap-icon">
        <FontAwesomeIcon
          icon={faHeart}
          className={`post__icon ${isHighlighted ? 'red' : ''}`}
          onClick={isHighlightedHandler}
        />
        <Typography variant="h6" sx={{ fontSize: '12px' }}>
          {likeCounter}
        </Typography>
      </Box>
    </Box>
  ) : null
}
