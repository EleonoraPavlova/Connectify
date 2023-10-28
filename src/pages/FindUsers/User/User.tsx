import React from 'react';
import './index.scss';
import { UserFoto } from "src/common/UserFoto/UserFoto";
import { Button } from "src/common/Button/Button";
import { usersItem } from "src/state/dataState";


type UserProps = {
  user: usersItem
  followUsers: () => void
}

export const User: React.FC<UserProps> = ({ user, followUsers }) => {

  return (<div className="find-users">
    <div className="find-users__box">
      <UserFoto link={user.src} additionalClass="find-users__image" />
      <div className="find-users__data">
        <p className="find-users__data-name"> {user.name} {user.lastName}</p>
        <p>{user.location.city}</p>  <p>{user.location.country}</p>
      </div>
    </div>
    <Button name="Follow" additionalClass="find-users__button" callBack={followUsers} />
  </div >)
}