import React from 'react'
import './index.scss'
import { DialogMessages } from './DialogsRender/DialogMessages'
import { Dialog } from './DialogsRender/Dialog'

type Props = {
  welcome?: string
}

const Dialogs: React.FC<Props> = ({ welcome }) => {
  return (
    <div>
      <h5 className="dialogs__welcome">{welcome}</h5>
      <div className="dialogs">
        <ul className="dialogs__items">
          <Dialog />
        </ul>
        <ul className="dialogs__messeges">
          <DialogMessages />
        </ul>
      </div>
    </div>
  )
}
export default Dialogs
