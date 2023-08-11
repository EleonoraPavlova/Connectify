import React, { useState } from 'react';
import './index.scss';
import dataState, { Messages } from "../../../state/dataState"
import AddMessages from "../AddMessage/AddMessage";

type UserDialogsType = {
  name: string
}

function UserDialogs(props: UserDialogsType) {
  let [arrMessages, setMessages] = useState<Messages[]>(dataState.dialogsPage.messagesData)

  const AddMessage = (mes: Messages) => {
    setMessages([mes, ...arrMessages])
    console.log(arrMessages)
  }

  return (
    <div className="userDialogs">
      <h4 className="userDialogs__h4">Your dialogs with {props.name}</h4>
      <AddMessages AddMessage={AddMessage} />
    </div>)
}

export default UserDialogs;