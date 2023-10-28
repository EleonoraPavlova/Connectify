import React from 'react';
import DialogItem from "../DialogItem/DialogItem"
import { DialogsType } from "../../../state/dataState"
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";



export const Dialog = () => {
  const dialogs = useSelector<AppRootState, DialogsType[]>(state => state.dialogsPage.dialogsData)
  let dialogsMap = dialogs.map((d: DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return (<>
    {dialogsMap}
  </>)
}