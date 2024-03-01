import React from 'react'
import DialogItem from '../DialogItem/DialogItem'
import { DialogsType } from '../../../state/initialState'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'src/state/store'

export const Dialog = () => {
  const dialogs = useSelector<AppRootStateType, DialogsType[]>((state) => state.dialogsPage.dialogsData)
  let dialogsMap = dialogs.map((d: DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return <>{dialogsMap}</>
}
