import { Dispatch, memo, SetStateAction } from 'react'
import s from './userForm.module.scss'
import { Box } from '@mui/material'
import { UserFoto } from '../UserFoto'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserForm } from 'common/hooks/useUserForm'
import { UserFormButton } from '../UserFormButton'
import { UserFormList } from '../UserFormList'
import { useSelector } from 'react-redux'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { Button } from 'components/Button'
import clsx from 'clsx'

type Props = {
  profileUserState: ExtendedInitialResponseProfileUser
  setProfileUserState: Dispatch<SetStateAction<ExtendedInitialResponseProfileUser>>
}

export const UserForm = memo(({ profileUserState, setProfileUserState }: Props) => {
  const meId = useSelector(selectAppMeId)
  const { editMode, formRef, filePicker, setEditMode, updatePhotoUser, saveForm, handlePick } = useUserForm(
    profileUserState,
    setProfileUserState
  )

  const cn = {
    container: clsx(s.container, 'flex-start'),
    photoBox: s.photoBox,
    btnInput: s.btnInput,
    input: s.input,
    meId: s.meId,
  }

  return (
    <Box className={cn.container} tabIndex={0}>
      <Box className={cn.photoBox} onClick={(e) => e.stopPropagation()}>
        <UserFoto link={profileUserState.photos.large} additionalClass={meId ? cn.meId : ''} />
        {editMode && (
          <>
            <Button className={cn.btnInput} onClick={handlePick}>
              Upload
            </Button>
            <input
              type="file"
              name="photo"
              ref={filePicker}
              hidden
              className={cn.input}
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
