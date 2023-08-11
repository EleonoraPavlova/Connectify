import React from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";
import { Dialogs } from "../../../state/dataState";


type DialogItemProps = Dialogs;


function DialogItem(props: DialogItemProps) {
  return (
    <li className="dialog-item"><NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink></li>)
}

export default DialogItem;