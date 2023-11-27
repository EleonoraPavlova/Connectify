import React from 'react';
import './index.scss';
import { FriendItem } from "../../state/initialState"
import { Friend } from "./Friend/Friend"
import { useSelector } from "react-redux";
import { AppRootStateType } from "src/state/store";


export const Friends = () => {
  const friendsData = useSelector<AppRootStateType, FriendItem[]>(state => state.friendsPage)

  let friend = friendsData.map((f: FriendItem) => <Friend key={f.id} friend={f} />)

  return (
    <div className="friends">
      {friend}
    </div>

  )
}