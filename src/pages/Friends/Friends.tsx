import React from 'react';
import './index.scss';
import { FriendsPage, FriendItem } from "../../state/dataState"
import Friend from "./Friend/Friend"


type FriendsProps = FriendsPage

function Friends(props: FriendsProps) {
  let friend = props.friendsData.map((f: FriendItem) => <Friend key={f.id} friend={f} />)
  return (
    <div className="friends">
      {friend}
    </div>
  )
}

export default Friends;