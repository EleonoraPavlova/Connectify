import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import {
  ExtendedInitialStateType, UpdateProfileUserStatusTC,
  UpdateProfileUserTC, getProfileUserTC
} from "src/state/reducers/userProfile/userProfileReducer";
import { UserForm } from "src/common/UserForm/UserForm";


export const UserInfo = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
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

  const UpdateProfileUserStatus = () => {
    dispatch(UpdateProfileUserStatusTC(profileUserState.status))
  }

  const onEditMode = useCallback(() => {
    setProfileUserState(profileUserState)
    if (!editMode) {
      setEditMode(true)
    } else {
      updateProfileUser()
      UpdateProfileUserStatus()
      setEditMode(false)
    }
  }, [editMode, profileUserState])

  return (
    <UserForm profileUserState={profileUserState} setProfileUserState={setProfileUserState}
      saveForm={onEditMode} editMode={editMode} setEditMode={setEditMode} />
  )
}