import React from 'react';
import './index.scss';
import UserFoto from "./UserFoto/UserFoto";



function UsersInfo() {
  return (<div className="user flex-start" >
    < UserFoto />
    <ul>
      <li className="user__item"><h4 className="user__name">Eleonora P.</h4></li>
      <li className="user__item"><b className="user__item-b">Date of Birth:</b>  18 August </li>
      <li className="user__item"><b className="user__item-b">City:</b> Kyiv </li>
      <li className="user__item"><b className="user__item-b">Education: </b>Marine Academy </li>
      <li className="user__item"><b className="user__item-b">Git:</b> <a className="user__link" href="https://github.com/EleonoraPavlova?tab=repositories"> tap </a></li>
    </ul>
  </div>)
}

export default UsersInfo;