import React, { memo } from 'react'
import s from './index.module.scss'
import { Box } from '@mui/material'
import { UserFoto } from '../UserFoto'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserForm } from 'common/hooks/useUserForm'
import { UserFormButton } from '../UserFormButton'
import { UserFormList } from '../UserFormList'

type Props = {
  profileUserState: ExtendedInitialResponseProfileUser
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
}

export const UserForm: React.FC<Props> = memo(({ profileUserState, setProfileUserState }) => {
  const mocPhoto = 'https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg'

  const { editMode, formRef, setEditMode, saveForm } = useUserForm(profileUserState, setProfileUserState)

  return (
    <Box className={`${s.user} flex-start`} tabIndex={0}>
      <UserFoto
        link={profileUserState.photos.small ? profileUserState.photos.small : mocPhoto}
        additionalClass={s.user__foto}
      />
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
