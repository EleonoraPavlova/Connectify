import React from 'react';
import './index.scss';
import DialogItem from "./DialogItem/DialogItem"
import DialogMessage from "./DialogMessage/DialogMessage"
import { Dialogs, Messages, DialogsPage } from "../../state/dataState"
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";


type DialogsProps = {
  welcome?: string;
}

function DialogsBox(props: DialogsProps) {
  const dialogsPage = useSelector<AppRootState, DialogsPage>(state => state.dialogsPage)

  let dialogs = dialogsPage.dialogsData.map((d: Dialogs) => <DialogItem key={d.id} id={d.id} name={d.name} />)
  let messages = dialogsPage.messagesData.map((mes: Messages) => <DialogMessage key={mes.id} id={mes.id} message={mes.message} />)


  return (<div> <h5 className="dialogs__welcome">{props.welcome}</h5>
    <div className="dialogs">
      <ul className="dialogs__items">
        {dialogs}
      </ul>
      <ul className="dialogs__messeges">
        {messages}
      </ul>
    </div>
  </div>)
}

export default DialogsBox;