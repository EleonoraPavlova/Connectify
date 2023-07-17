import React from 'react';
import './index.scss';
import UserFoto from "../../common/UserFoto/UserFoto";
import { FriendsPage, FriendItem } from "../../state/dataState"
import Friend from "./Friend/Friend"


type FriendsProps = FriendsPage

function Friends(props: FriendsProps) {
  let friend = props.friendsData.map((f: FriendItem) => <Friend key={f.id} id={f.id} name={f.name} lastName={f.lastName} src={f.src} />)
  return (
    <div className="friends">
      {friend}
    </div>
  )
}

export default Friends;