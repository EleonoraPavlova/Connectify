import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserForm } from '../UserForm'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { useAppDispatch } from 'common/hooks/selectors'
import { ExtendedInitialResponseProfileUser } from 'common/types'

export const UserInfo = () => {
  const profileUser = useSelector(selectUserProfile)
  console.log('profileUser', profileUser)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialResponseProfileUser>(profileUser)
  console.log('profileUserState', profileUserState)
  const meId = useSelector(selectAppMeId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) dispatch(userThunks.getProfileUserTC({ userId: meId }))
  }, [dispatch, meId])

  useEffect(() => {
    setProfileUserState(profileUser)
  }, [profileUser])

  return (
    <UserForm
      profileUserState={profileUserState}
      setProfileUserState={setProfileUserState}
      // updateProfileUser={updateProfileUser}
      // updateProfileUserStatus={updateProfileUserStatus}
    />
  )
}
