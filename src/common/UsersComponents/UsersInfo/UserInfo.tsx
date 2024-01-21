import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import s from "./index.module.scss";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { UserFoto } from "../UserFoto/UserFoto";
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { EditableSpan } from "src/common/EditableSpan/EditableSpan";
import {
  ExtendedInitialStateType, UpdateProfileUserStatusTC,
  UpdateProfileUserTC, getProfileUserTC
} from "src/state/reducers/userProfile/userProfileReducer";


export const UserInfo = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const profileUser = useAppSelector<ExtendedInitialStateType>(state => state.userProfile)
  let meId = useAppSelector<number | null>(state => state.app.meId)
  let profileUserUpperFullName = profileUser && profileUser.fullName
    ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1)
    : '';
  const mocPhoto = "https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) {
      dispatch(getProfileUserTC(meId))
    }
  }, [dispatch, meId])


  const updateProfileUser = useCallback((name: string, updatedField: string) => {
    dispatch(UpdateProfileUserTC(name, updatedField))
  }, [dispatch])

  const UpdateProfileUserStatus = useCallback((status: string) => {
    dispatch(UpdateProfileUserStatusTC(status))
  }, [dispatch])


  const updateProfileUserCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = e.currentTarget.checked
    updateProfileUser("lookingForAJob", currentStatus ? "true" : "false")
  }, [updateProfileUser])

  const updateProfileUserNameHandler = useCallback((updatedValue: string) => {
    updateProfileUser("fullName", updatedValue)
  }, [updateProfileUser])

  const updateProfileUserDescHandler = useCallback((updatedValue: string) => {
    updateProfileUser("lookingForAJobDescription", updatedValue)
  }, [updateProfileUser])

  const onEditMode = () => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

  return (
    <Box className={`${s.user} flex-start`}>
      <UserFoto link={profileUser.photos.small ? profileUser.photos.small : mocPhoto} />
      <Box>
        <List>
          <ListItem className={s.user__item}>
            <EditableSpan title={profileUserUpperFullName} label={"Name"} error={false}
              helperText={""} additionalClass={s.user__name} editMode={editMode} setEditMode={setEditMode}
              onChange={updateProfileUserNameHandler} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography >Status: </Typography>
            <EditableSpan title={profileUser.status ? profileUser.status : "........"} label={"Status"} error={false}
              helperText={""} editMode={editMode} setEditMode={setEditMode} onChange={UpdateProfileUserStatus} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}>Id: </span> {profileUser.userId} </Typography>
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}> Looking for a job:</span>
            </Typography>
            <Checkbox name="lookingForAJob" color="success"
              checked={profileUser.lookingForAJob}
              onChange={updateProfileUserCheckboxHandler}
            />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}><span style={{ fontWeight: 'bold' }}> Description:</span>
            </Typography>
            <EditableSpan title={profileUser.lookingForAJobDescription ? profileUser.lookingForAJobDescription : "........"}
              label={"Description"} error={false}
              helperText={""} editMode={editMode} setEditMode={setEditMode}
              onChange={updateProfileUserDescHandler} />
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
          onClick={onEditMode}>
          <ModeEditOutlineOutlinedIcon fontSize={"small"} />
        </IconButton>
      </Box>
    </Box >
  )
}