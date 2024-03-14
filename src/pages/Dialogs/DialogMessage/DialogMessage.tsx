import React from 'react'
import './index.scss'
import { MessagesType } from '../../../state/initialState'

type DialogMessageProps = MessagesType

export const DialogMessage: React.FC<DialogMessageProps> = ({ id, message }) => {
  return (
    <li className="dialog-message" id={`${id}`}>
      {message}
    </li>
  )
}
