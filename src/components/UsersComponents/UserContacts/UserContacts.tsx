import ListItem from '@mui/material/ListItem'
import React from 'react'
import s from './index.module.scss'

type Props = {
  icon: string
  href: string
}

export const UserContacts: React.FC<Props> = ({ icon, href }) => {
  return (
    <ListItem className={s.contacts}>
      <a href={href} rel="noreferrer" target="_blank" className={s.link}>
        <img src={icon} className={s.contacts__icon} alt={icon} />
      </a>
    </ListItem>
  )
}
