import React from 'react';
import './index.scss';
import UserFoto from "../../common/UserFoto/UserFoto";



export const UsersInfo = () => {
  return (<div className="user flex-start" >
    < UserFoto link={"https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"} additionalClass="" />
    <ul>
      <li className="user__item"><h4 className="user__name">Eleonora P.</h4></li>
      <li className="user__item"><b className="user__item-b">Date of Birth:</b>  18 August </li>
      <li className="user__item"><b className="user__item-b">City:</b> Kyiv </li>
      <li className="user__item"><b className="user__item-b">Education: </b>Marine Academy </li>
      <li className="user__item"><b className="user__item-b">Git:</b> <a className="user__link" href="https://github.com/EleonoraPavlova?tab=repositories"> tap </a></li>
    </ul>
  </div>)
}