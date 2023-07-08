import React from 'react';
import './index.scss';

type DialogsType = {
  name: string
}

function Dialogs(props: DialogsType) {
  return (<div>
    <ul>
      <li>{props.name}</li>
    </ul>
  </div>)
}

export default Dialogs;