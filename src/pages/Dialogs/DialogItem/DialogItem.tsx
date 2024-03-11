import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { DialogsType } from '../../../state/initialState'

type DialogItemProps = DialogsType

export const DialogItem: React.FC<DialogItemProps> = ({ id, name }) => {
  return (
    <li className="dialog-item">
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </li>
  )
}
