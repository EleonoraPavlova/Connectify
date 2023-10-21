import React from 'react';
import './index.scss';
import Logo from "../Logo/Logo";



export const Footer = () => {
  return (<div className="footer">
    <p className="footer__recerved">® 2023 All rights recerved</p>
    <div className="footer__logo">
      <Logo styleImg="footer__img" styleText="footer__text" />
    </div>
  </div>)
}