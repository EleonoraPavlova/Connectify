import React, { memo } from 'react'
import './index.scss'
import { AddMessage } from '../AddMessage'

type Props = {
  name: string
}

const UserDialogs: React.FC<Props> = memo(({ name }) => {
  return (
    <div className="userDialogs">
      <h4 className="userDialogs__h4">Your dialogs with {name}</h4>
      <AddMessage />
    </div>
  )
})
export default UserDialogs
