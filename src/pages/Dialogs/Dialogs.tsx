import React from 'react';
import './index.scss';
import DialogItem from "./DialogItem/DialogItem"
import DialogMessage from "./DialogMessage/DialogMessage"
import { Dialogs, Messages, DialogsPage } from "../../state/dataState"


type DialogsProps = DialogsPage & { welcome?: string };

function DialogsBox(props: DialogsProps) {
  let dialogs = props.dialogsData.map((d: Dialogs) => <DialogItem key={d.id} id={d.id} name={d.name} />)
  let messages = props.messagesData.map((mes: Messages) => <DialogMessage key={mes.id} id={mes.id} message={mes.message} />)

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