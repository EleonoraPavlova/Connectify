import React from 'react';
import './index.scss';

type UserFotoProps = {
  link: string
  additionalClass?: string
}

export const UserFoto = (props: UserFotoProps) => {
  return (<div>
    <img src={props.link} alt="avatar" className={`avatar ${props.additionalClass}`} />
  </div>)
}
