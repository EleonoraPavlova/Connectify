import React from 'react';
import './index.scss';

type ButtonProps = {
  name: string
  additionalClass: string
  callBack?: (() => void) | undefined
}

export const Button = (props: ButtonProps) => {
  const onClickHandler = () => {
    if (props.callBack) props.callBack()
  };
  return (
    <button className={`button ${props.additionalClass}`} type="submit" onClick={onClickHandler}>{props.name}</button>
  )
}