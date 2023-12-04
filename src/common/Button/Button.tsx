import React from 'react';
import './index.scss';

type ButtonProps = {
  name: string
  additionalClass: string
  callBack?: (() => void) | undefined
}

export const Button: React.FC<ButtonProps> = ({ name, additionalClass, callBack }) => {
  const onClickHandler = () => {
    if (callBack) callBack()
  }
  return (
    <button className={`button ${additionalClass}`} type="submit" onClick={onClickHandler}>{name}</button>
  )
}