import './index.scss'
import { NavLink } from 'react-router-dom'

type Props = {
  id: string
  name: string
}

export const DialogItem = ({ id, name }: Props) => {
  return (
    <li className="dialog-item">
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </li>
  )
}
