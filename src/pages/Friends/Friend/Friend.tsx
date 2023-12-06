import React from 'react';
import './index.scss';
import { FriendItem } from "src/state/initialState";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";


type FriendProps = {
  friend: FriendItem
}

export const Friend = ({ friend }: FriendProps) => {
  return (
    <div className="friend">
      <UserFoto link={friend.src} additionalClass="friend__foto" />
      <h5 className="friend__name"> {friend.name}</h5>
    </div>
  )
}