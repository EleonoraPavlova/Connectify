import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserForm } from '../UserForm'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useActions } from 'common/hooks/useActions'

export const UserInfo = () => {
  const profileUser = useSelector(selectUserProfile)
  const [profileUserState, setProfileUserState] = useState<ExtendedInitialResponseProfileUser>(profileUser)
  const { getProfileUserTC } = useActions(userThunks)

  const meId = useSelector(selectAppMeId)

  useEffect(() => {
    if (meId) getProfileUserTC({ userId: meId })
  }, [getProfileUserTC, meId])

  useEffect(() => {
    setProfileUserState(profileUser)
  }, [profileUser])

  return <UserForm profileUserState={profileUserState} setProfileUserState={setProfileUserState} />
}
