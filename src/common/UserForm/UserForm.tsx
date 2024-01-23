import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import s from "./index.module.scss";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";
import { EditableSpan } from "src/common/EditableSpan/EditableSpan";
import {
  ExtendedInitialStateType
} from "src/state/reducers/userProfile/userProfileReducer";
import { UserFoto } from "../UsersComponents/UserFoto/UserFoto";
import { useAppSelector } from "src/state/hooks/hooks-selectors";
import { log } from "console";

type UserFormProps = {
  profileUserState: ExtendedInitialStateType,
  setProfileUserState: (arg: any) => void
  updateProfileUser: () => void,
  updateProfileUserStatus: () => void
}

export const UserForm: React.FC<UserFormProps> = ({ profileUserState, setProfileUserState, updateProfileUser, updateProfileUserStatus }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
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

  const formRef = useRef(null)
  const handleContainerClick = (e: Event) => {
    e.preventDefault()
    const currentElement = e.target

    console.log(currentElement);
    if (formRef.current) {
      // @ts-ignore
      const isContain = formRef.current.contains(currentElement)

      if (!isContain) {
        setEditMode(false)
        const body = document.querySelector('body')
        body?.removeEventListener('click', handleContainerClick)
      }
    }
  }

  useEffect(() => {
    const body = document.querySelector('body')
    if (editMode) {
      body?.addEventListener('click', handleContainerClick)
    }
  }, [editMode])

  const saveForm = useCallback(() => {
    setProfileUserState(profileUserState)
    if (!editMode) {
      setEditMode(true)
    } else {
      updateProfileUser()
      updateProfileUserStatus()
      setEditMode(false)
    }
  }, [editMode, profileUserState])



  return (
    <Box className={`${s.user} flex-start`} tabIndex={0}  >
      <UserFoto link={profileUserState.photos.small ? profileUserState.photos.small : mocPhoto} />
      <Box ref={formRef} >
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
          onClick={(event) => {
            event.stopPropagation()
            saveForm()
          }}>
          <ModeEditOutlineOutlinedIcon fontSize={"small"} />
        </IconButton>
      </Box>
    </Box >
  )
}