import React from 'react';
import './index.scss';
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";
import { usersItem } from "src/state/dataState";
import { User } from "./User/User";


export const Users = () => {
  const users = useSelector<AppRootState, usersItem[]>(state => state.usersPage)

  const followUsers = () => {
    alert("Follow")
  }
  const usersMap = users.map((u: usersItem) => <User key={u.id} user={u} followUsers={followUsers} />)

  return (<div className="users">{usersMap}</div>)
}