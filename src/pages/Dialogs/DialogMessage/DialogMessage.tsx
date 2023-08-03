import React from 'react';
import './index.scss';
import { Messages } from "../../../state/dataState"


type DialogMessageProps = Messages;

function DialogMessage(props: DialogMessageProps) {
  return (
    <li className="dialog-message" id={`${props.id}`}>{props.message}</li>
  )
}

export default DialogMessage;