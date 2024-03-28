import React, { useEffect, useState } from 'react'
import { useAppDispatch } from 'state/hooks/selectors'
import {
  ExtendedInitialState,
  updateProfileUserStatusTC,
  updateProfileUserTC,
  getProfileUserTC,
  selectUserProfile,
} from 'state/reducers/userProfileSlice/userProfileSlice'
import { selectAppMeId } from 'state/reducers/appSlice/appSlice'
import { useSelector } from 'react-redux'
import { UserForm } from '../UserForm'

export const UserInfo = () => {
  const profileUser = useSelector(selectUserProfile)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialState>(profileUser)

  const meId = useSelector(selectAppMeId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) dispatch(getProfileUserTC({ userId: meId }))
  }, [dispatch, meId])

  useEffect(() => {
    setProfileUserState(profileUser)
  }, [profileUser])

  const updateProfileUser = () => {
    dispatch(updateProfileUserTC({ params: profileUserState }))
  }

  const updateProfileUserStatus = () => {
    dispatch(updateProfileUserStatusTC({ status: profileUserState.status }))
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
