import React from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";


type DialogItemType = {
  name: string
  id: number
}


function DialogItem(props: DialogItemType) {
  return (
    <li className="dialog-item"><NavLink to={"/dialogs/id:" + props.id}>{props.name}</NavLink></li>)
}

export default DialogItem;