import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UserApi } from 'common/types'
import { useAppDispatch } from 'common/hooks/selectors'
import { usersThunks } from 'BLL/reducers/usersSlice'
import { userThunks } from 'BLL/reducers/userProfileSlice'
import { User } from 'features/pages/FindUsers/User'

export type Props = {
  btnText: string
  user: UserApi
}

export const UsersMap: React.FC<Props> = ({ btnText, user }) => {
  const { id, followed } = user
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const toggleFollowUser = useCallback(() => {
    if (!user.followed) {
      dispatch(usersThunks.toggleFollowUserTC({ userId: id, followed }))
    } else if (user.followed) {
      dispatch(usersThunks.unFollowUserTC({ userId: id, followed }))
    }
  }, [user.followed, dispatch])

  const viewFullProfile = useCallback(() => {
    dispatch(userThunks.getProfileUserTC({ userId: id, isLoader: false }))
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
      callBack={() => (btnText === 'Message' ? sendMessage() : viewFullProfile())}
      btnTexInfo={btnText}
    />
  )
}
