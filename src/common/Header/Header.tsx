import React from 'react';
import './index.scss';
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";

export const Header = () => {
  return (<header className="header">
    <Logo img="header__img" additionalClass="header__text" />
    <Button name={"Log Out"} additionalClass="header__button" />
  </header >)
}