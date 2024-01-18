import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import s from "./index.module.scss";
import { UserFoto } from "../UserFoto/UserFoto";
import { ResponseProfileUserType } from "src/api/profileApi";
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";
import { UserApiType } from "src/api/usersApi";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { EditableSpan } from "src/common/EditableSpan/EditableSpan";
import { getProfileUserTC } from "src/state/reducers/userProfile/userProfileReducer";


export const UserInfo = () => {
  const itemsData = useAppSelector<UserApiType[]>(state => state.usersPage.items)
  const profileUser = useAppSelector<ResponseProfileUserType>(state => state.userProfile)
  let meId = useAppSelector<number | null>(state => state.app.meId)
  let profileUserUpper = profileUser && profileUser.fullName
    ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1)
    : '';

  let findStatus = itemsData.find(u => u.id === meId)
  const mocPhoto = "https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (meId) {
      dispatch(getProfileUserTC(meId))
    }
  }, [dispatch, meId])


  const changeTitle = () => {
    alert("changeTitle")
  }

  return (
    <Box className={`${s.user} flex-start`}>
      <UserFoto link={profileUser.photos.large ? profileUser.photos.large : mocPhoto} />
      <Box>
        <List>
          <ListItem className={s.user__item}>
            <Typography variant="h4" sx={{
              paddingBottom: "15px",
              fontSize: "24px"
            }}> {profileUserUpper}</Typography>
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography >Status: </Typography><EditableSpan title={findStatus?.status} changeTitle={changeTitle} />
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}>Id: </span> {profileUser.userId} </Typography>
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}>
              <span style={{ fontWeight: 'bold' }}> Looking for a job:</span>
              {profileUser.lookingForAJob}</Typography>
          </ListItem>
          <ListItem className={s.user__item}>
            <Typography sx={{ paddingRight: "8px" }}><span style={{ fontWeight: 'bold' }}> Description:</span>
              {profileUser.lookingForAJobDescription}</Typography>
          </ListItem>
        </List>
        <List className={s.user__contact}>
          {<SocialContactsMap />}
        </List>
      </Box>
    </Box >
  )
}