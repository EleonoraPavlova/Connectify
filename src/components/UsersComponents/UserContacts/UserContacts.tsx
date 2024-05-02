import ListItem from '@mui/material/ListItem'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  icon: string
  href: string
}

export const UserContacts: React.FC<Props> = ({ icon, href }) => {
  return (
    <ListItem className={'modal__data-contacts'}>
      <NavLink to={href} rel="noreferrer" target="_blank">
        <img src={icon} className="modal__data-icon" alt={icon} />
      </NavLink>
    </ListItem>
  )
}
