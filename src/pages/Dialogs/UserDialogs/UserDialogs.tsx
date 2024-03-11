import React, { memo } from 'react'
import './index.scss'
import { AddMessages } from '../AddMessage/AddMessage'

type UserDialogs = {
  name: string
}

export const UserDialogs: React.FC<UserDialogs> = memo(({ name }) => {
  return (
    <div className="userDialogs">
      <h4 className="userDialogs__h4">Your dialogs with {name}</h4>
      <AddMessages />
    </div>
  )
})
