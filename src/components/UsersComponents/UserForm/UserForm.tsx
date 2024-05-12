import React, { ChangeEvent, memo } from 'react'
import s from './index.module.scss'
import { Box } from '@mui/material'
import { UserFoto } from '../UserFoto'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserForm } from 'common/hooks/useUserForm'
import { UserFormButton } from '../UserFormButton'
import { UserFormList } from '../UserFormList'
import { useSelector } from 'react-redux'
import { selectAppMeId } from 'BLL/reducers/appSlice'

type Props = {
  profileUserState: ExtendedInitialResponseProfileUser
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
}

export const UserForm: React.FC<Props> = memo(({ profileUserState, setProfileUserState }) => {
  // debugger
  const meId = useSelector(selectAppMeId)
  const { editMode, formRef, setEditMode, updatePhotoUser, saveForm } = useUserForm(
    profileUserState,
    setProfileUserState
  )

  return (
    <Box className={`${s.user} flex-start`} tabIndex={0}>
      <Box className={s.user__boxFoto} onClick={(e) => e.stopPropagation()}>
        <UserFoto link={profileUserState.photos.large} additionalClass={meId ? s.user__meId : ''} />
        {editMode && <input type="file" name="photo" onChange={updatePhotoUser} />}
      </Box>
      <UserFormList
        editMode={editMode}
        profileUserState={profileUserState}
        formRef={formRef}
        setEditMode={setEditMode}
        setProfileUserState={setProfileUserState}
        saveForm={saveForm}
      />
      <UserFormButton editMode={editMode} saveForm={saveForm} />
    </Box>
  )
})
