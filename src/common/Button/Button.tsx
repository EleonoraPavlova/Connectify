import React from 'react';
import './index.scss';

type ButtonProps = {
  name: string
  additionalClass: string
  callBack: () => void
}

function Button(props: ButtonProps) {
  const onClickHandler = () => {
    return props.callBack();
  };
  return (
    <div className="flex-end">
      <button className={`button ${props.additionalClass}`} type="submit" onClick={onClickHandler}>{props.name}</button>
    </div>)
}

export default Button;