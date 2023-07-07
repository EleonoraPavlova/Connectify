import React from 'react';
import './index.scss';

type UserFotoProps = {
  link: string
}

function UserFoto(props: UserFotoProps) {
  return (<div>
    <img src={props.link} alt="avatar" className="avatar" />
  </div>)
}

export default UserFoto;