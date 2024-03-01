import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav__item">
          <NavLink to="/"> Profile</NavLink>{' '}
        </li>
        <li className="nav__item">
          <NavLink to="/dialogs">Dialogs</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/friends">Friends</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/findUsers"> Find users</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/news">News</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/music">Music</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  )
}
