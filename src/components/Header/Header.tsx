import React from 'react';
import './index.scss';
import Logo from "../Logo/Logo";



function Header() {
  return (<header className="header">
    <Logo styleImg="header__img" styletText="header__text" />
  </header>)
}

export default Header;