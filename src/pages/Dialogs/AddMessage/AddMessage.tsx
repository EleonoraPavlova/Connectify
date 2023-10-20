import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './index.scss';
import Button from "../../../common/Button/Button";
import { Messages } from "../../../state/dataState"
import { v1 } from "uuid";

type AddMessageType = {
  AddMessage: (mes: Messages) => void;
}

const AddMessages = (props: AddMessageType) => {
  let [textValue, setTextValue] = useState<string>("")
  const [texts, setTexts] = useState<string[]>([]);

  const addMessageHandler = (textValue: string) => {
    if (textValue) {
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
        <div className="message__output" key={index}>
          <img
            className="message__img"
            src="https://cdn.pixabay.com/photo/2023/07/22/05/50/wolf-8142720_1280.png"
            alt="avatar"
          />
          <p className="message__output-text" >
            {el} </p>
        </div>
      )
    })
  }

  return (
    <div className="message">
      <div className="message__main"> {mappedList()}</div>
      <div className="message__footer">
        <textarea minLength={10} className="message__texarea" placeholder="......." id="textarea1" name="message" value={textValue}
          onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
        < Button callBack={() => addMessageHandler(textValue)} name="Send" additionalClass="message__button" />
      </div>
    </div>)
}

export default AddMessages;