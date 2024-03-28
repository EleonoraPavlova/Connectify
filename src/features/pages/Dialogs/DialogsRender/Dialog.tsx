import React from 'react'
import { DialogItem } from '../DialogItem'

type DialogsType = {
  id: string
  name: string
}

export const Dialog = () => {
  const mocDialog: DialogsType[] = [
    { id: '1', name: 'Dialog 1' },
    { id: '2', name: 'Dialog 2' },
  ]
  let dialogsMap = mocDialog.map((d: DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return <>{dialogsMap}</>
}
