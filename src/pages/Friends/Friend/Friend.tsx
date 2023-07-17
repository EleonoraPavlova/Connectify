import React from 'react';
import './index.scss';
import UserFoto from "../../../common/UserFoto/UserFoto";
import { FriendItem } from "../../../state/dataState";

type FriendProps = FriendItem;

function Friend(props: FriendProps) {
  return (
    <div className="friend">
      <UserFoto link={props.src} additionalClass="friend__foto" />
      <h5 className="friend__name"> {props.name} {props.lastName} </h5>
    </div>
  )
}

export default Friend;