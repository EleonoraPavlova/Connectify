import React from 'react';
import './index.scss';

type ButtonProps = {
  name: string
  additionalClass: string
}

function Button(props: ButtonProps) {
  // const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   const button: HTMLButtonElement = event.currentTarget;
  // }
  return (
    <div className="flex-end">
      <button className={`button ${props.additionalClass}`} type="submit" onClick={() => alert("bdhbhsbh")}>{props.name}</button>
    </div>)
}

export default Button;