import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UserApi } from 'common/types'
import { usersThunks } from 'BLL/reducers/usersSlice'
import { userThunks } from 'BLL/reducers/userProfileSlice'
import { User } from 'features/pages/FindUsers/User'
import { useActions } from 'common/hooks/useActions'

export type Props = {
  btnText: string
  user: UserApi
}

export const UsersMap: React.FC<Props> = ({ btnText, user }) => {
  const { id, followed } = user
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()

  const { toggleFollowUserTC, unFollowUserTC } = useActions(usersThunks)
  const { getProfileUserTC } = useActions(userThunks)

  const toggleFollowUser = useCallback(() => {
    if (!user.followed) {
      toggleFollowUserTC({ userId: id, followed })
    } else if (user.followed) {
      unFollowUserTC({ userId: id, followed })
    }
  }, [user.followed, toggleFollowUserTC, unFollowUserTC])

  const viewFullProfile = useCallback(() => {
    getProfileUserTC({ userId: id, isLoader: false })
    setActiveModal(true)
    setSearchParams({ id: `${id}` })
  }, [getProfileUserTC, setActiveModal, setSearchParams])

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
