import React from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";

type LogoProps = {
  img: string
  additionalClass: string
}

export const Logo: React.FC<LogoProps> = ({ img, additionalClass }) => {
  return (
    <NavLink to={"/"} className="logo not-active" >
      <img className={img} src="https://cdn.pixabay.com/photo/2016/06/09/18/36/logo-1446293_1280.png" alt="logo" />
      <h6 className={additionalClass}> Social net </h6>
    </NavLink >
  )
}