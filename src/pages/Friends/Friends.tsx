import React from 'react';
import './index.scss';
import { FriendItem } from "../../state/dataState"
import { Friend } from "./Friend/Friend"
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";


export const Friends = () => {
  const friendsData = useSelector<AppRootState, FriendItem[]>(state => state.friendsPage)

  let friend = friendsData.map((f: FriendItem) => <Friend key={f.id} friend={f} />)

  return (
    <div className="friends">
      {friend}
    </div>

  )
}