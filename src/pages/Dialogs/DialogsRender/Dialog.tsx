import React from 'react'
import { DialogsType } from '../../../state/initialState'
import { useAppSelector } from 'state/hooks/selectors'
import { DialogItem } from '../DialogItem/DialogItem'

export const Dialog = () => {
  const dialogs = useAppSelector<DialogsType[]>((state) => state.dialogs.dialogsData)
  let dialogsMap = dialogs.map((d: DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return <>{dialogsMap}</>
}
