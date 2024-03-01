import React from 'react'
import './index.scss'
import { MessagesType } from '../../../state/initialState'

type DialogMessageProps = MessagesType

export const DialogMessage = (props: DialogMessageProps) => {
  return (
    <li className="dialog-message" id={`${props.id}`}>
      {props.message}
    </li>
  )
}
