import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import {
  ExtendedInitialStateType, UpdateProfileUserStatusTC,
  UpdateProfileUserTC, getProfileUserTC
} from "src/state/reducers/userProfile/userProfileReducer";
import { UserForm } from "src/common/UserForm/UserForm";


export const UserInfo = () => {
  const profileUser = useAppSelector<ExtendedInitialStateType>(state => state.userProfile)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialStateType>(profileUser)

  const meId = useAppSelector<number | null>(state => state.app.meId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) {
      dispatch(getProfileUserTC(meId))
    }
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
    <UserForm profileUserState={profileUserState} setProfileUserState={setProfileUserState}
      updateProfileUser={updateProfileUser} updateProfileUserStatus={updateProfileUserStatus} />
  )
}