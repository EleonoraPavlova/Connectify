import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent, memo } from 'react';


type EditableSpanProps = {
  title: string | undefined;
  isDone?: boolean | undefined
  changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = memo((props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>("")

  const onEditMode = () => {
    if (!props.isDone) {
      setEditMode(true)
      if (props.title) setTitle(props.title)
    }
  }

  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.currentTarget.value + ", e.currentTarget.value)
    setTitle(e.currentTarget.value)
  }


  const onKeyDownEditHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      offEditMode();
    }
  }

  return (
    editMode ?
      <TextField
        value={title}
        onChange={onChangeHandler}
        onBlur={offEditMode}
        variant="standard"
        onKeyDown={onKeyDownEditHandler}
        autoFocus />
      :
      <Typography onDoubleClick={onEditMode} sx={{ paddingRight: "8px" }} > {props.title} </Typography>
  )
})

// const StyledEditableSpan = styled.span`
//   overflow: auto;
// `;