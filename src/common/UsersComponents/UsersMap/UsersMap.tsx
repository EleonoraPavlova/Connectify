import { UserApiType } from 'api/usersApi'
import { User } from 'pages/FindUsers/User/User'
import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'state/hooks/hooks-selectors'
import { getProfileUserTC } from 'state/reducers/userProfile/userProfileReducer'
import { toggleFollowUserTC, unFollowUserTC } from 'state/reducers/users/usersReducer'

export type UsersMapType = {
  btnTextInfo: string
  user: UserApiType
}

export const UsersMap: React.FC<UsersMapType> = ({ btnTextInfo, user }) => {
  const profileUserStatus = useAppSelector<string>((state) => state.userProfile.status)
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const toggleFollowUser = useCallback(() => {
    if (!user.followed) {
      dispatch(toggleFollowUserTC(user.id, user.followed))
    } else if (user.followed) {
      dispatch(unFollowUserTC(user.id, user.followed))
    }
  }, [user.followed, dispatch])

  const viewFullProfile = useCallback(() => {
    dispatch(getProfileUserTC(user.id))
    setActiveModal(true)
    setSearchParams({ id: `${user.id}` })
  }, [dispatch, setActiveModal, setSearchParams])

  const sendMessage = () => {
    alert('Will send')
  }

  return (
    <User
      key={user.id}
      user={user}
      toggleFollowUser={toggleFollowUser}
      btnTextToggle={user.followed ? 'Unfollowed' : 'Follow'}
      disabled={user.followingInProgress === 'loading'}
      callBack={() => (btnTextInfo === 'Message' ? sendMessage() : viewFullProfile())}
      btnTexInfo={btnTextInfo}
    />
  )
}
