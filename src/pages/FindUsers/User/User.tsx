import React from 'react';
import './index.scss';
import { Button } from "src/common/Button/Button";
import { UserTypeApi } from "src/api/usersApi";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


type UserProps = {
  user: UserTypeApi
  btnTextToggle: string
  btnTexInfo: string
  toggleFollowUser: () => void
  callBack: () => void
}

export const User: React.FC<UserProps> = ({ user, btnTextToggle, btnTexInfo, toggleFollowUser, callBack }) => {
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  return (
    <Box className="find-users">
      <Box className="find-users__box">
        <UserFoto link={user.photos.small ? user.photos.small : mocPhoto} additionalClass="find-users__image" />
        <Box className="find-users__data">
          <Typography variant="h6" className="find-users__data-name"> {user.name}</Typography>
          {user.followed ? <Typography> Id: {user.id}</Typography> : null}
          <Typography className="find-users__data-status">{user.status}</Typography>
        </Box>
      </Box>
      <Box className="find-users__buttons">
        <Button name={btnTextToggle} additionalClass="find-users__button" callBack={toggleFollowUser} />
        <Button name={btnTexInfo} additionalClass="find-users__button" callBack={callBack} />
      </Box>
    </Box >
  )
}