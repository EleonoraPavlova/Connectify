import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './index.scss';
// import Button from "../../../common/Button/Button";
import { Messages } from "../../../state/dataState"
import { v1 } from "uuid";

type AddMessageType = {
  AddMessage: (mes: Messages) => void;
}

function AddMessages(props: AddMessageType) {
  let [textValue, setTextValue] = useState<string>("")
  const [texts, setTexts] = useState<string[]>([]);

  const addMessageHandler = (textValue: string) => {
    if (!textValue) {
      let newMessage = {
        id: v1(),
        message: textValue,
      }
      setTexts([textValue, ...texts])
      props.AddMessage(newMessage)
      setTextValue("")
    }

  }

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      addMessageHandler(e.currentTarget.value);
    }
  }

  function mappedList() {
    return texts.map((el, index) => {
      return (
        <p className="message__output speech" key={index}>
          {el} </p>)
    })
  }

  return (
    <div className="message">
      <textarea minLength={10} className="message__texarea speech" placeholder="......." id="textarea1" name="message" value={textValue}
        onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
      <div> {mappedList()}</div>

      {/* < Button callBack={() => addMessageHandler(textValue)} name="Add" additionalClass="" /> */}
    </div>)
}

export default AddMessages;