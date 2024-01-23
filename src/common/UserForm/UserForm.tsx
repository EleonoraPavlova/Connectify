import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent } from 'react';
import s from "./index.module.scss";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";
import { EditableSpan } from "src/common/EditableSpan/EditableSpan";
import {
  ExtendedInitialStateType
} from "src/state/reducers/userProfile/userProfileReducer";
import { UserFoto } from "../UsersComponents/UserFoto/UserFoto";
import { useAppSelector } from "src/state/hooks/hooks-selectors";

type UserFormProps = {
  profileUserState: ExtendedInitialStateType,
  editMode: boolean,
  setProfileUserState: (arg: any) => void
  setEditMode: (arg: boolean) => void,
  saveForm: () => void
}

export const UserForm: React.FC<UserFormProps> = ({ editMode, profileUserState, setProfileUserState, setEditMode, saveForm }) => {
  const meId = useAppSelector<number | null>(state => state.app.meId)

  let profileUserUpperFullName = profileUserState && profileUserState.fullName
    ? profileUserState.fullName[0].toUpperCase() + profileUserState.fullName.slice(1)
    : '';

  const mocPhoto = "https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"

  const collectionOfForm = (key: string, title: string) => {
    setProfileUserState((prevState: ExtendedInitialStateType) => ({
      ...prevState,
      [key]: title
    }))
  }


  const collectionOfFormCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileUserState((prevState: ExtendedInitialStateType) => ({
      ...prevState,
      lookingForAJob: e.currentTarget.checked
    }))
  }


  return (
    <Box className={`${s.user} flex-start`}>
      <UserFoto link={profileUserState.photos.small ? profileUserState.photos.small : mocPhoto} />
      <Box>
        <List>
          <ListItem className={s.user__item}>
            <EditableSpan title={profileUserUpperFullName} label={"Name"} error={false}
              helperText={""} additionalClass={s.user__name} editMode={editMode} setEditMode={setEditMode}
              onChange={(title) => collectionOfForm("fullName", title)}
              saveForm={saveForm} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>Status:</Typography>
            <EditableSpan title={profileUserState.status} label={"Status"} error={false}
              helperText={""} editMode={editMode} setEditMode={setEditMode}
              onChange={(title) => collectionOfForm("status", title)}
              saveForm={saveForm} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ fontWeight: 'bold' }}>About me:</Typography>
            <EditableSpan title={profileUserState.aboutMe} label={"AboutMe"} error={false}
              helperText={""} editMode={editMode} setEditMode={setEditMode}
              onChange={(title) => collectionOfForm("aboutMe", title)}
              saveForm={saveForm} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}>Id: </span> {meId} </Typography>
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}> Description:</span>
            </Typography>
            <EditableSpan title={profileUserState.lookingForAJobDescription}
              label={"Description"} error={false}
              helperText={""} editMode={editMode} setEditMode={setEditMode}
              onChange={(title) => collectionOfForm("lookingForAJobDescription", title)}
              saveForm={saveForm} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}> Looking for a job:</span>
            </Typography>
            <Checkbox name="lookingForAJob" color="success"
              checked={profileUserState.lookingForAJob}
              disabled={!editMode}
              onChange={(e) => collectionOfFormCheckbox(e)}
            />
          </ListItem>
        </List>
        <List className={s.user__contact}>
          {<SocialContactsMap />}
        </List>
      </Box>
      <Box sx={{
        height: "100%",
        alignSelf: "baseline",
      }}>
        <IconButton color={"success"}
          aria-label="change text"
          onClick={saveForm}>
          <ModeEditOutlineOutlinedIcon fontSize={"small"} />
        </IconButton>
      </Box>
    </Box >
  )
}