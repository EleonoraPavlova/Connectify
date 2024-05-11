import React, { memo } from 'react'
import s from './index.module.scss'
import { Box, List, ListItem, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from 'components/EditableSpan'
import { SocialContactsMap } from 'components/SocialContactsMap'
import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useUserFormList } from 'common/hooks/useUserFormList'

type Props = {
  editMode: boolean
  profileUserState: ExtendedInitialResponseProfileUser
  formRef: React.MutableRefObject<HTMLDivElement | null>
  setEditMode: (arg: boolean) => void
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
  saveForm: () => void
}

export const UserFormList: React.FC<Props> = memo(
  ({ profileUserState, editMode, formRef, setProfileUserState, setEditMode, saveForm }) => {
    const { formItems, collectionOfForm, collectionOfFormCheckbox } = useUserFormList(
      profileUserState,
      setProfileUserState
    )

    return (
      <Box className={s.user__box} ref={formRef}>
        <List sx={{ width: '69%' }}>
          {formItems.map((item) => (
            <ListItem key={item.label} className={s.user__item}>
              <Typography sx={{ fontWeight: 'bold', padding: '10px 9px' }}>{item.label}:</Typography>
              <EditableSpan
                title={item.title}
                label={item.label}
                error={false}
                helperText={''}
                additionalClass={s.user__name}
                editMode={editMode}
                setEditMode={setEditMode}
                onChange={(title) => collectionOfForm(item.prop, title)}
                saveForm={saveForm}
              />
            </ListItem>
          ))}
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold', padding: '10px 9px' }}>Looking for a job:</Typography>
            <Checkbox
              name="lookingForAJob"
              color="success"
              checked={profileUserState.lookingForAJob}
              disabled={!editMode}
              onChange={(e) => collectionOfFormCheckbox(e)}
              sx={{ width: 'fit-content', padding: '0' }}
            />
          </ListItem>
        </List>
        <SocialContactsMap />
      </Box>
    )
  }
)
