import { ChangeEvent, useCallback, useState } from 'react'
import './index.scss'
import Box from '@mui/material/Box'
import { Button } from 'components/Button'

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
        <Button fontSize="medium" onClick={() => addPostHandler(textValue)}>
          Send
        </Button>
      </div>
    </Box>
  )
}
