import React from 'react'
import './index.scss'

type DialogMessageProps = {
  id: string
  message: string
}

export const DialogMessage: React.FC<DialogMessageProps> = ({ id, message }) => {
  return (
    <li className="dialog-message" id={`${id}`}>
      {message}
    </li>
  )
}
