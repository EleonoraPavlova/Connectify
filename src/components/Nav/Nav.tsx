import React from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";


// const items = [
//   {
//     title: "Profile",
//     url: '/profile'
//   },
//   {
//     title: "Dialogs",
//     url: '/dialogs'
//   },
//   {
//     title: "News",
//     url: '/news'
//   },
//   {
//     title: "Music",
//     url: '/music'
//   },
//   {
//     title: "Settings",
//     url: '/settings'
//   },

// ]


function Nav() {
  // const location = useLocation();
  // const { pathname } = location;
  // const splitLocation = pathname.split("/");
  return (
    <nav className="nav">
      <ul>
        <li className="nav__item"><NavLink to="/"> Profile</NavLink> </li>
        <li className="nav__item"><NavLink to="/dialogs">Dialogs</NavLink></li>
        <li className="nav__item"><NavLink to="/friends">Friends</NavLink></li>
        <li className="nav__item"><NavLink to="/news">News</NavLink></li>
        <li className="nav__item"><NavLink to="/music">Music</NavLink></li>
        <li className="nav__item"><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav >)
}
//className={splitLocation[1] === "dialogs" ? "active" : "nav__link"}
export default Nav;