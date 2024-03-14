import React, { ChangeEvent, useCallback, useState } from 'react'
import './index.scss'
import { Button } from '../../../common/Button/Button'
// import { addPostAC } from "src/state/reducers/profile/profileReducer";
import Box from '@mui/material/Box'

export const FormPosts = () => {
  let [textValue, setTextValue] = useState<string>('')

  const addPostHandler = useCallback(
    (textValue: string) => {
      // dispatch(addPostAC(textValue))
      setTextValue('')
    },
    [textValue]
  )

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value)
  }

  return (
    <Box className="form-posts">
      <label htmlFor="posts" className="form-posts__label">
        My posts
      </label>
      <textarea
        minLength={10}
        className="form-posts__texarea"
        placeholder="My news...."
        id="posts"
        name="posts"
        value={textValue}
        onChange={onChangeHandler}
      />
      <div className="flex-end">
        <Button callBack={() => addPostHandler(textValue)} name="Send" additionalClass="form-posts__button" />
      </div>
    </Box>
  )
}
