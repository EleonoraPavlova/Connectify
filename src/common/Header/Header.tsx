import React from 'react';
import './index.scss';
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { useAppSelector } from "src/state/hooks/hooks-selectors";

export const Header = () => {
  let isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  return (<header className="header">
    <Logo img="header__img" additionalClass="header__text" />
    {isLoggedIn && <Button name={"Log Out"} additionalClass="header__button" />}
  </header >)
}