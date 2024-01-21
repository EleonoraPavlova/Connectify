import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent, memo, useEffect } from 'react';


type EditableSpanProps = {
  title: string | undefined
  label: string
  error?: boolean | undefined
  helperText?: string
  additionalClass?: string
  isDone?: boolean | undefined
  editMode: boolean
  setEditMode: (arg: boolean) => void
  onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = memo((props) => {
  let [title, setTitle] = useState<string | undefined>(props.title)

  useEffect(() => {
    setTitle(props.title)
  }, [props.title, props.editMode])

  const offEditMode = () => {
    props.setEditMode(false)
    if (title) props.onChange(title)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownEditHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      offEditMode();
    }
  }
  // debugger
  return (
    props.editMode ?
      <TextField
        value={title}
        type="text"
        label={props.label}
        autoComplete={props.label}
        error={props.error}
        helperText={props.helperText}
        onChange={onChangeHandler}
        // onBlur={offEditMode}
        variant="outlined"
        onKeyDown={onKeyDownEditHandler}
        className={props.additionalClass}
        autoFocus
      />
      :
      <Typography sx={{ paddingRight: "8px" }} variant="h6" > {props.title} </Typography>
  )
})
//onDoubleClick = { onEditMode }