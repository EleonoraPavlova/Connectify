import { UserApi } from 'api/usersApi'
import { User } from 'pages/FindUsers/User/User'
import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'state/hooks/selectors'
import { getProfileUserTC } from 'state/reducers/userProfileSlice/userProfileSlice'
import { toggleFollowUserTC, unFollowUserTC } from 'state/reducers/usersSlice/usersSlice'

export type UsersMapType = {
  btnTextInfo: string
  user: UserApi
}

export const UsersMap: React.FC<UsersMapType> = ({ btnTextInfo, user }) => {
  const { id, followed } = user
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const toggleFollowUser = useCallback(() => {
    if (!user.followed) {
      dispatch(toggleFollowUserTC({ userId: id, followed }))
    } else if (user.followed) {
      dispatch(unFollowUserTC({ userId: id, followed }))
    }
  }, [user.followed, dispatch])

  const viewFullProfile = useCallback(() => {
    dispatch(getProfileUserTC({ userId: id }))
    setActiveModal(true)
    setSearchParams({ id: `${id}` })
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
