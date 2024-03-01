import React, { useEffect, useState } from 'react'
import { UserForm } from '../UserForm/UserForm'
import { useAppDispatch, useAppSelector } from 'state/hooks/hooks-selectors'
import {
  ExtendedInitialStateType,
  UpdateProfileUserStatusTC,
  UpdateProfileUserTC,
  getProfileUserTC,
} from 'state/reducers/userProfile/userProfileReducer'

export const UserInfo = () => {
  const profileUser = useAppSelector<ExtendedInitialStateType>((state) => state.userProfile)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialStateType>(profileUser)

  const meId = useAppSelector<number | null>((state) => state.app.meId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) dispatch(getProfileUserTC(meId))
  }, [dispatch, meId])

  useEffect(() => {
    setProfileUserState(profileUser)
  }, [profileUser])

  const updateProfileUser = () => {
    dispatch(UpdateProfileUserTC(profileUserState))
  }

  const updateProfileUserStatus = () => {
    dispatch(UpdateProfileUserStatusTC(profileUserState.status))
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
