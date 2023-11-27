import React from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";
import { DialogsType } from "../../../state/initialState";


type DialogItemProps = DialogsType;


function DialogItem(props: DialogItemProps) {
  return (
    <li className="dialog-item"><NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink></li>)
}

export default DialogItem;