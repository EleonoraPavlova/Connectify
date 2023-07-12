import React from 'react';
import './index.scss';

type DialogMessageProps = {
  message: string
  id: number
}


function DialogMessage(props: DialogMessageProps) {
  return (
    <li className="dialog-message" id={`${props.id}`}>{props.message}</li>
  )
}

export default DialogMessage;