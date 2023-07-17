import React from 'react';
import './index.scss';
import { Messages } from "../../../state/dataState"


type DialogMessage = Messages;

function DialogMessage(props: DialogMessage) {
  return (
    <li className="dialog-message" id={`${props.id}`}>{props.message}</li>
  )
}

export default DialogMessage;