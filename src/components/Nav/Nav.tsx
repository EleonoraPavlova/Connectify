import React from 'react';
import './index.scss';
import { Link, useLocation } from "react-router-dom";



function Nav() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (<nav className="nav">
    <ul>
      <li className="nav__item"><Link to="/profile" className={splitLocation[1] === "profile" ? "active" : "nav__link"}> Profile</Link> </li>
      <li className="nav__item"><Link to="/dialogs" className={splitLocation[1] === "dialogs" ? "active" : "nav__link"}>Dialogs</Link></li>
      <li className="nav__item"><Link to="/news" className={splitLocation[1] === "news" ? "active" : "nav__link"}>News</Link></li>
      <li className="nav__item"><Link to="/music" className={splitLocation[1] === "music" ? "active" : "nav__link"}>Music</Link></li>
      <li className="nav__item"><Link to="/settings" className={splitLocation[1] === "settings" ? "active" : "nav__link"}>Settings</Link></li>
    </ul>
  </nav >)
}

export default Nav;