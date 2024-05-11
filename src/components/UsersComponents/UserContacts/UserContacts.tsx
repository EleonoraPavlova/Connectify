import ListItem from '@mui/material/ListItem'
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './index.module.scss'

type Props = {
  icon: string
  href: string
}

export const UserContacts: React.FC<Props> = ({ icon, href }) => {
  return (
    <ListItem className={s.contacts}>
      <NavLink to={href} rel="noreferrer" target="_blank" className={s.link}>
        <img src={icon} className={s.contacts__icon} alt={icon} />
      </NavLink>
    </ListItem>
  )
}
