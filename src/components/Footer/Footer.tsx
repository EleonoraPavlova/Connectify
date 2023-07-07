import React from 'react';
import './index.scss';
import Logo from "../Logo/Logo";

// type FooterPropsType = {
//   text: String
// }

function Footer() {
  console.log('Footer is rendering')
  return (<div className="footer">
    <p className="footer__recerved">® 2023 All rights recerved</p>
    <div className="footer__logo">
      <Logo styleImg="footer__img" styletText="footer__text" />
    </div>
  </div>)
}

export default Footer;