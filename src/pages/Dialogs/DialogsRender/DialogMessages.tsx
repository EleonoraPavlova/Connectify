import React from 'react'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { MessagesType } from '../../../state/initialState'
import { useSelector } from 'react-redux'
import { AppRootState } from 'state/store'

export const DialogMessages = () => {
  const messages = useSelector<AppRootState, MessagesType[]>((state) => state.dialogsPage.messagesData)
  let messagesMap = messages.map((mes: MessagesType) => (
    <DialogMessage key={mes.id} id={mes.id} message={mes.message} />
  ))

  return <>{messagesMap}</>
}
