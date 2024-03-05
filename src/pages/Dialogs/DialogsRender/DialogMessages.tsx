import React from 'react'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { MessagesType } from '../../../state/initialState'
import { useAppSelector } from 'state/hooks/hooks-selectors'

export const DialogMessages = () => {
  const messages = useAppSelector<MessagesType[]>((state) => state.dialogs.messagesData)
  let messagesMap = messages.map((mes: MessagesType) => (
    <DialogMessage key={mes.id} id={mes.id} message={mes.message} />
  ))

  return <>{messagesMap}</>
}
