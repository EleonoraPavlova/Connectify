import React from 'react';
import './index.scss';
import UserFoto from "../../../common/UserFoto/UserFoto";
import { FriendItem } from "../../../state/dataState";


type FriendProps = {
  friend: FriendItem
}

function Friend({ friend }: FriendProps) {
  return (
    <div className="friend">
      <UserFoto link={friend.src} additionalClass="friend__foto" />
      <h5 className="friend__name"> {friend.name} {friend.lastName} </h5>
    </div>
  )
}

export default Friend;