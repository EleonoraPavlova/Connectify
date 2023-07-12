import React from 'react';
import './index.scss';
import DialogItem from "./DialogItem/DialogItem"
import DialogMessage from "./DialogMessage/DialogMessage"



function Dialogs() {
  let dialogsData = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
    { id: 5, name: 'Five' },
    { id: 6, name: 'Six' },
    { id: 7, name: 'Seven' },
  ]

  let dialogs = dialogsData.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />)

  let messagesData = [
    { id: 1, name: 'Hi, how is going?' },
    { id: 2, name: 'Where are you?' },
    { id: 3, name: 'Ok' },
    {
      id: 4, name: 'Don\'t ask'
    },
    { id: 5, name: 'Five' },
    { id: 6, name: 'Six' },
    { id: 7, name: 'Seven' },
  ]

  let messages = messagesData.map((mes) => <DialogMessage key={mes.id} id={mes.id} message={mes.name} />)

  return (<div className="dialogs">
    <ul className="dialogs__items">
      {dialogs}
    </ul>
    <ul className="dialogs__messeges">
      {messages}
    </ul>
  </div>)
}

export default Dialogs;