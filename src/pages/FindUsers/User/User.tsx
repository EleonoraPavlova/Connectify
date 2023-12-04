import React, { useState } from 'react';
import './index.scss';
import { UserFoto } from "src/common/UserFoto/UserFoto";
import { Button } from "src/common/Button/Button";
import { UserTypeApi } from "src/api/usersApi";


type UserProps = {
  user: UserTypeApi
  btnTextToggle: string
  btnTexInfo: string
  toggleFollowUser: () => void
  callBack: () => void
}

export const User: React.FC<UserProps> = ({ user, btnTextToggle, btnTexInfo, toggleFollowUser, callBack }) => {
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  return (
    <div className="find-users">
      <div className="find-users__box">
        <UserFoto link={user.photos.small ? user.photos.small : mocPhoto} additionalClass="find-users__image" />
        <div className="find-users__data">
          <p className="find-users__data-name"> {user.name}</p>
          {user.followed ? <p className="find-users__data-name"> Id: {user.id}</p> : null}
          <p className="find-users__data-status">{user.status}</p>
        </div>
      </div>
      <div className="find-users__buttons">
        <Button name={btnTextToggle} additionalClass="find-users__button" callBack={toggleFollowUser} />
        <Button name={btnTexInfo} additionalClass="find-users__button" callBack={callBack} />
      </div>
    </div >
  )
}