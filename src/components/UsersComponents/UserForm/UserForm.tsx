import React, { memo } from 'react'
import s from './index.module.scss'
import { Box } from '@mui/material'
import { UserFoto } from '../UserFoto'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserForm } from 'common/hooks/useUserForm'
import { UserFormButton } from '../UserFormButton'
import { UserFormList } from '../UserFormList'
import { useSelector } from 'react-redux'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { Button } from 'components/Button'

type Props = {
  profileUserState: ExtendedInitialResponseProfileUser
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
}

export const UserForm: React.FC<Props> = memo(({ profileUserState, setProfileUserState }) => {
  const meId = useSelector(selectAppMeId)
  const { editMode, formRef, filePicker, setEditMode, updatePhotoUser, saveForm, handlePick } = useUserForm(
    profileUserState,
    setProfileUserState
  )

  return (
    <Box className={`${s.user} flex-start`} tabIndex={0}>
      <Box className={s.user__boxFoto} onClick={(e) => e.stopPropagation()}>
        <UserFoto link={profileUserState.photos.large} additionalClass={meId ? s.user__meId : ''} />
        {editMode && (
          <>
            <Button name="Upload" additionalClass={s.user__btnInput} callBack={handlePick}></Button>
            <input
              type="file"
              name="photo"
              ref={filePicker}
              className={s.user__hidden}
              accept="image/*, .png, .jpg, .gif, .jpeg"
              onChange={updatePhotoUser}
            />
          </>
        )}
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
