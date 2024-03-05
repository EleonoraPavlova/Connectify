import React from 'react'
import DialogItem from '../DialogItem/DialogItem'
import { DialogsType } from '../../../state/initialState'
import { useAppSelector } from 'state/hooks/hooks-selectors'

export const Dialog = () => {
  const dialogs = useAppSelector<DialogsType[]>((state) => state.dialogs.dialogsData)
  let dialogsMap = dialogs.map((d: DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return <>{dialogsMap}</>
}
