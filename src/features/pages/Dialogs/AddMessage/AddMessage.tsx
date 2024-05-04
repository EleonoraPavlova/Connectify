import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'
import './index.scss'
import { Button } from 'components/Button'

export const AddMessage = () => {
  let [textValue, setTextValue] = useState<string>('')
  const [texts, setTexts] = useState<string[]>([])

  const addMessageHandler = useCallback(
    (text: string) => {
      setTexts([textValue, ...texts])
      setTextValue('')
    },
    [textValue]
  )

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') addMessageHandler(e.currentTarget.value)
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
          <p className="message__output-text">{el} </p>
        </div>
      )
    })
  }

  return (
    <div className="message">
      <div className="message__main"> {mappedList()}</div>
      <div className="message__footer">
        <textarea
          minLength={10}
          className="message__texarea"
          placeholder="......."
          id="textarea1"
          name="message"
          value={textValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button callBack={() => addMessageHandler(textValue)} name="Add" additionalClass="message__button" />
      </div>
    </div>
  )
}
