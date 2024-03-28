import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'

type DialogItemProps = {
  id: string
  name: string
}

export const DialogItem: React.FC<DialogItemProps> = ({ id, name }) => {
  return (
    <li className="dialog-item">
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </li>
  )
}
