import React from 'react'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { MessagesType } from '../../../state/initialState'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'src/state/store'

export const DialogMessages = () => {
  const messages = useSelector<AppRootStateType, MessagesType[]>((state) => state.dialogsPage.messagesData)
  let messagesMap = messages.map((mes: MessagesType) => (
    <DialogMessage key={mes.id} id={mes.id} message={mes.message} />
  ))

  return <>{messagesMap}</>
}
