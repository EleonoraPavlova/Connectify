import React from 'react';
import './index.scss';

type ButtonProps = {
  name: string
  additionalClass: string
  callBack: () => void
}

export const Button = (props: ButtonProps) => {
  const onClickHandler = () => {
    return props.callBack();
  };
  return (
    <button className={`button ${props.additionalClass}`} type="submit" onClick={onClickHandler}>{props.name}</button>
  )
}