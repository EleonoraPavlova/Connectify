import React, { memo } from 'react'
import './index.scss'

type Props = {
  name: string
  additionalClass: string
  disabled?: boolean
  callBack?: (() => void) | undefined
}

export const Button: React.FC<Props> = memo(({ name, additionalClass, disabled, callBack }) => {
  const onClickHandler = () => {
    if (callBack) callBack()
  }

  return (
    <button className={`button ${additionalClass}`} type="submit" onClick={onClickHandler} disabled={disabled}>
      {name}
    </button>
  )
})
