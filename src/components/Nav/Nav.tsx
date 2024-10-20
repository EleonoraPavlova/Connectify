import './index.scss'
import { NavLink } from 'react-router-dom'
import { List, ListItem } from '@mui/material'

export const Nav = () => {
  return (
    <nav className="nav">
      <List>
        <ListItem className="nav__item">
          <NavLink to="/"> Profile</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/dialogs">Dialogs</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/friends">Friends</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/findUsers"> Find users</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/news">News</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/music">Music</NavLink>
        </ListItem>
        <ListItem className="nav__item">
          <NavLink to="/settings">Settings</NavLink>
        </ListItem>
      </List>
    </nav>
  )
}
