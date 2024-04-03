import React, { memo, useRef } from 'react'
import s from './index.module.scss'
import { Box, IconButton, List, ListItem, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { SaveAsOutlined } from '@mui/icons-material'
import { EditableSpan } from 'components/EditableSpan'
import { UserFoto } from '../UserFoto'
import { SocialContactsMap } from 'components/SocialContactsMap'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserForm } from 'common/hooks/useUserForm'

type UserFormProps = {
  profileUserState: ExtendedInitialResponseProfileUser
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
}

export const UserForm: React.FC<UserFormProps> = memo(({ profileUserState, setProfileUserState }) => {
  let profileUserUpperFullName =
    profileUserState && profileUserState.fullName
      ? profileUserState.fullName[0].toUpperCase() + profileUserState.fullName.slice(1)
      : ''

  const mocPhoto = 'https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg'
  const formRef = useRef<HTMLDivElement | null>(null)

  const { editMode, setEditMode, collectionOfForm, collectionOfFormCheckbox, saveForm } = useUserForm(
    profileUserState,
    formRef,
    setProfileUserState
  )

  return (
    <Box className={`${s.user} flex-start`} tabIndex={0}>
      <UserFoto
        link={profileUserState.photos.small ? profileUserState.photos.small : mocPhoto}
        additionalClass={s.user__foto}
      />
      <Box className={s.user__box} ref={formRef}>
        <List sx={{ width: '69%' }}>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>Name:</Typography>
            <EditableSpan
              title={profileUserUpperFullName}
              label={'Name'}
              error={false}
              helperText={''}
              additionalClass={s.user__name}
              editMode={editMode}
              setEditMode={setEditMode}
              onChange={(title) => collectionOfForm('fullName', title)}
              saveForm={saveForm}
            />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>Status:</Typography>
            <EditableSpan
              title={profileUserState.status}
              label={'Status'}
              error={false}
              helperText={''}
              editMode={editMode}
              setEditMode={setEditMode}
              onChange={(title) => collectionOfForm('status', title)}
              saveForm={saveForm}
            />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>About me:</Typography>
            <EditableSpan
              title={profileUserState.aboutMe}
              label={'AboutMe'}
              error={false}
              helperText={''}
              editMode={editMode}
              setEditMode={setEditMode}
              onChange={(title) => collectionOfForm('aboutMe', title)}
              saveForm={saveForm}
            />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>Description:</Typography>
            <EditableSpan
              title={profileUserState.lookingForAJobDescription}
              label={'Description'}
              error={false}
              helperText={''}
              editMode={editMode}
              setEditMode={setEditMode}
              onChange={(title) => collectionOfForm('lookingForAJobDescription', title)}
              saveForm={saveForm}
            />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>Looking for a job:</Typography>
            <Checkbox
              name="lookingForAJob"
              color="success"
              checked={profileUserState.lookingForAJob}
              disabled={!editMode}
              onChange={(e) => collectionOfFormCheckbox(e)}
              sx={{ width: 'fit-content' }}
            />
          </ListItem>
        </List>
        <List className={s.user__contact}>{<SocialContactsMap />}</List>
      </Box>
      <Box sx={{ height: '100%', alignSelf: 'baseline' }}>
        {editMode ? (
          <IconButton
            color={'success'}
            aria-label="change text"
            onClick={(event) => {
              event.stopPropagation()
              saveForm()
            }}>
            <SaveAsOutlined fontSize={'small'} />
          </IconButton>
        ) : (
          <IconButton
            color={'success'}
            aria-label="change text"
            onClick={(event) => {
              event.stopPropagation()
              saveForm()
            }}>
            <ModeEditOutlineOutlinedIcon fontSize={'small'} />
          </IconButton>
        )}
      </Box>
    </Box>
  )
})
