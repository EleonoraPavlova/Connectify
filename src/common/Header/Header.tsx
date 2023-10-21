import React from 'react';
import './index.scss';
import Logo from "../Logo/Logo";



export const Header = () => {
  return (<header className="header">
    <Logo styleImg="header__img" styleText="header__text" />
  </header>)
}