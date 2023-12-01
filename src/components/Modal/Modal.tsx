import React from 'react';
import './index.scss';
import { UserFoto } from "src/common/UserFoto/UserFoto";
import { Button } from "src/common/Button/Button";
import { ResponseProfileUserType } from "src/api/profileApi";

type ModalProps = {
  profileId: number
  // ResponseProfileUserType[];
}

export const Modal: React.FC<ModalProps> = ({ profileId }) => {
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  return (<div className="find-users">
    {/* <div className="find-users__box">
      <UserFoto link={profile.photos.large ? profile.photos.large : mocPhoto} additionalClass="find-users__image" />
      <div className="find-users__data">
        <p className="find-users__data-name"> {profile.fullName}</p>
        <p>{profile.userId}</p>
        <p>{profile.lookingForAJob}</p>
        <p>{profile.lookingForAJobDescription}</p>
        <p>{profile.contacts.facebook}</p>
        <p>{profile.contacts.github}</p>
        <p>{profile.contacts.instagram}</p>
        <p>{profile.contacts.mainLink}</p>
        <p>{profile.contacts.twitter}</p>
        <p>{profile.contacts.vk}</p>
        <p>{profile.contacts.website}</p>
        <p>{profile.contacts.youtube}</p>
      </div>
    </div> */}
    {/* <div className="find-users__buttons">
      <Button name={btnText} additionalClass="find-users__button" callBack={toggleFollowUser} />
    </div> */}
  </div >)
}
