import React, { memo } from 'react';
import s from './index.module.scss';
import { UserApiType } from "src/api/usersApi";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


type UserProps = {
  user: UserApiType
  btnTextToggle: string
  btnTexInfo: string
  disabled: boolean
  toggleFollowUser: () => void
  callBack: () => void
}

export const User: React.FC<UserProps> = memo(({ user, btnTextToggle, btnTexInfo, disabled, toggleFollowUser, callBack }) => {
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  return (
    <Box className={s.user}>
      <Box className={s.user__box}>
        <UserFoto link={user.photos.small ? user.photos.small : mocPhoto} additionalClass={s.user__image} />
        <Box className={s.user__data}>
          <Typography variant="h6" className={s.user__name}> {user.name}</Typography>
          {user.followed ? <Typography> Id: {user.id}</Typography> : null}
          <Typography className={s.user__status}>{user.status}</Typography>
        </Box>
      </Box>
      <Box className={s.user__buttons}>
        <Button
          className={s.user__button}
          variant="outlined"
          color="success"
          size="small"
          disabled={disabled}
          onClick={toggleFollowUser}>{btnTextToggle}</Button>
        <Button
          className={s.user__button}
          variant="outlined"
          color="success"
          size="small"
          disabled={disabled}
          onClick={callBack}>{btnTexInfo}</Button>
      </Box>
    </Box >
  )
})