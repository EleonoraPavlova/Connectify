import { TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState, KeyboardEvent, memo, useEffect } from 'react'

type Props = {
  title: string | undefined
  label: string
  error?: boolean | undefined
  helperText?: string
  additionalClass?: string
  isDone?: boolean | undefined
  editMode: boolean
  saveForm?: () => void | undefined
  setEditMode?: (arg: boolean) => void | undefined
  onChange: (title: string) => void
}

export const EditableSpan: React.FC<Props> = memo((props) => {
  let [title, setTitle] = useState<string | undefined>(props.title)

  useEffect(() => {
    setTitle(props.title)
  }, [props.title, props.editMode])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setTitle(value)
    props.onChange(value)
  }

  const onKeyDownEditHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (props.saveForm) {
        props.saveForm()
      }
    }
  }

  return props.editMode ? (
    <TextField
      value={title}
      type="text"
      label={props.label}
      error={props.error}
      helperText={props.helperText}
      onChange={onChangeHandler}
      variant="outlined"
      onKeyDown={onKeyDownEditHandler}
      className={props.additionalClass}
      inputProps={{
        style: { padding: '8px 6px' },
      }}
    />
  ) : (
    <Typography sx={{ paddingRight: '8px' }} variant="h6">
      {props.title}
    </Typography>
  )
})
