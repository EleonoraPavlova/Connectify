import React from 'react';
import './index.scss';
import { Link } from "react-router-dom";



function Nav() {
  return (<nav className="nav">
    <ul>
      <li className="nav__item"><Link to="/profile" className="nav__link">Profile</Link> </li>
      <li className="nav__item"><Link to="/messages" className="nav__link">Messages</Link></li>
      <li className="nav__item"><Link to="/news" className="nav__link">News</Link></li>
      <li className="nav__item"><Link to="/music" className="nav__link">Music</Link></li>
      <li className="nav__item"><Link to="/settings" className="nav__link">Settings</Link></li>
    </ul>
  </nav>)
}

export default Nav;