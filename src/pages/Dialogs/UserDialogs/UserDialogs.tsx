import React from 'react';
import './index.scss';
import { AddMessages } from "../AddMessage/AddMessage";

type UserDialogsType = {
  name: string
}

export const UserDialogs = (props: UserDialogsType) => {
  return (
    <div className="userDialogs">
      <h4 className="userDialogs__h4">Your dialogs with {props.name}</h4>
      <AddMessages />
    </div>)
}