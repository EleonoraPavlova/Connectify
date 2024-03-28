import React, { memo } from 'react'
import './index.scss'
import { AddMessages } from '../AddMessage/AddMessage'

type UserDialogsProps = {
  name: string
}

export const UserDialogs: React.FC<UserDialogsProps> = memo(({ name }) => {
  return (
    <div className="userDialogs">
      <h4 className="userDialogs__h4">Your dialogs with {name}</h4>
      <AddMessages />
    </div>
  )
})
