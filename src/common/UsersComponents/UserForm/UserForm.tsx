import { Box, IconButton, List, ListItem, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import React, { memo } from 'react'
import s from './index.module.scss'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { UserFoto } from '../UserFoto/UserFoto'
import { SaveAsOutlined } from '@mui/icons-material'
import { ExtendedInitialState } from 'state/reducers/userProfileSlice/userProfileSlice'
import { EditableSpan } from 'common/EditableSpan/EditableSpan'
import { useUserForm } from 'state/hooks/useUserForm'
import { SocialContactsMap } from 'common/SocialContactsMap/SocialContactsMap'
import { useSelector } from 'react-redux'
import { selectAppMeId } from 'state/reducers/appSlice/appSlice'

type UserFormProps = {
  profileUserState: ExtendedInitialState
  setProfileUserState: (arg: any) => void
  updateProfileUser: () => void
  updateProfileUserStatus: () => void
}

export const UserForm: React.FC<UserFormProps> = memo(
  ({ profileUserState, setProfileUserState, updateProfileUser, updateProfileUserStatus }) => {
    const meId = useSelector(selectAppMeId)

    let profileUserUpperFullName =
      profileUserState && profileUserState.fullName
        ? profileUserState.fullName[0].toUpperCase() + profileUserState.fullName.slice(1)
        : ''

    const mocPhoto = 'https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg'

    const { editMode, formRef, setEditMode, collectionOfForm, collectionOfFormCheckbox, saveForm } = useUserForm(
      profileUserState,
      setProfileUserState,
      updateProfileUser,
      updateProfileUserStatus
    )

    return (
      <Box className={`${s.user} flex-start`} tabIndex={0}>
        <UserFoto link={profileUserState.photos.small ? profileUserState.photos.small : mocPhoto} />
        <Box ref={formRef}>
          <List>
            <ListItem className={s.user__item}>
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
              <Typography sx={{ paddingRight: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Id: </span> {meId}
              </Typography>
            </ListItem>
            <ListItem className={s.user__item}>
              <Typography sx={{ paddingRight: '8px' }}>
                <span style={{ fontWeight: 'bold' }}> Description:</span>
              </Typography>
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
              <Typography sx={{ paddingRight: '8px' }}>
                <span style={{ fontWeight: 'bold' }}> Looking for a job:</span>
              </Typography>
              <Checkbox
                name="lookingForAJob"
                color="success"
                checked={profileUserState.lookingForAJob}
                disabled={!editMode}
                onChange={(e) => collectionOfFormCheckbox(e)}
              />
            </ListItem>
          </List>
          <List className={s.user__contact}>{<SocialContactsMap />}</List>
        </Box>
        <Box
          sx={{
            height: '100%',
            alignSelf: 'baseline',
          }}>
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
  }
)
