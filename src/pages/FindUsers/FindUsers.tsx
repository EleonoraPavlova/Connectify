import React from 'react';
import './index.scss';
// import { UserFoto } from "src/common/UserFoto/UserFoto";
import { Friend } from "../Friends/Friend/Friend";
import { v1 } from "uuid";



type FindFriendsProps = {
  welcome?: string;
}

export const FindUsers = (props: FindFriendsProps) => {
  return (<div className="find-friends">
    {/* <UserFoto link={"https://i.pinimg.com/236x/7a/8e/f1/7a8ef1a39a2d9162e16c122d96f84701.jpg"} additionalClass="find-friends__image" /> */}
    <Friend friend={{
      name: "Tamara",
      id: v1(),
      lastName: "Popova",
      src: "https://i.pinimg.com/236x/7a/8e/f1/7a8ef1a39a2d9162e16c122d96f84701.jpg"
    }} />
  </div>)
}