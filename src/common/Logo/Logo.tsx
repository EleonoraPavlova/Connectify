import React from 'react';
import './index.scss';

type styleClassProps = {
  styleImg: string
  styleText: string
}

function Logo(props: styleClassProps) {
  return (<div className="logo">
    <img className={props.styleImg} src="https://cdn.pixabay.com/photo/2016/06/09/18/36/logo-1446293_1280.png" alt="logo" />
    <h6 className={props.styleText}> Social net </h6>
  </div>)
}

export default Logo;