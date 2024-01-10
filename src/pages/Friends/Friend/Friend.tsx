import React from 'react';
import './index.scss';
import { FriendItem } from "src/state/initialState";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type FriendProps = {
  friend: FriendItem
}

export const Friend = ({ friend }: FriendProps) => {
  return (
    <Box className="friend">
      <UserFoto link={friend.src} additionalClass="friend__foto" />
      <Typography variant="h5" sx={{ fontSize: "15px", fontWeight: "bold" }}> {friend.name} </Typography>
    </Box>
  )
}