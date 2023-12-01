import React from 'react';
import './index.scss';
import { UserFoto } from "../../../common/UserFoto/UserFoto";
import { FriendItem } from "src/state/initialState";


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