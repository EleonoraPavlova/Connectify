import React from 'react';
import './index.scss';
import Logo from "../Logo/Logo";



function Header() {
  return (<header className="header">
    <Logo styleImg="header__img" styleText="header__text" />
  </header>)
}

export default Header;