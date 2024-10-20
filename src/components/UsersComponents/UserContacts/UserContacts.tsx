import ListItem from '@mui/material/ListItem'
import s from './index.module.scss'

type Props = {
  icon: string
  href: string
}

export const UserContacts = ({ icon, href }: Props) => {
  return (
    <ListItem className={s.contacts}>
      <a href={href} rel="noreferrer" target="_blank" className={s.link}>
        <img src={icon} className={s.contacts__icon} alt={icon} />
      </a>
    </ListItem>
  )
}
