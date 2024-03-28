import React, { useEffect, useState } from 'react'
import { useAppDispatch } from 'state/hooks/selectors'
import { useSelector } from 'react-redux'
import { UserForm } from '../UserForm'
import { ExtendedInitialState, selectUserProfile, userThunks } from 'state/reducers/userProfileSlice'
import { selectAppMeId } from 'state/reducers/appSlice'

export const UserInfo = () => {
  const profileUser = useSelector(selectUserProfile)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialState>(profileUser)

  const meId = useSelector(selectAppMeId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) dispatch(userThunks.getProfileUserTC({ userId: meId }))
  }, [dispatch, meId])

  useEffect(() => {
    setProfileUserState(profileUser)
  }, [profileUser])

  const updateProfileUser = () => {
    dispatch(userThunks.updateProfileUserTC({ params: profileUserState }))
  }

  const updateProfileUserStatus = () => {
    dispatch(userThunks.updateProfileUserStatusTC({ status: profileUserState.status }))
  }

  return (
    <UserForm
      profileUserState={profileUserState}
      setProfileUserState={setProfileUserState}
      updateProfileUser={updateProfileUser}
      updateProfileUserStatus={updateProfileUserStatus}
    />
  )
}
