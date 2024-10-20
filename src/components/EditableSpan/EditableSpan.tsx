import { TextField, TextFieldProps, Typography, TypographyProps } from '@mui/material'
import { ChangeEvent, useState, KeyboardEvent, memo, useEffect } from 'react'

type Props = {
  title: string | undefined
  error?: boolean | undefined
  helperText?: string | null
  editMode: boolean
  saveForm?: () => void | undefined
  setEditMode?: (arg: boolean) => void | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Partial<TextFieldProps> &
  Partial<TypographyProps>

export const EditableSpan = memo((props: Props) => {
  const { editMode, helperText, error, saveForm, setEditMode, onChange, ...muiProps } = props

  let [title, setTitle] = useState<string | undefined>(props.title)

  useEffect(() => {
    setTitle(props.title)
  }, [props.title, editMode])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setTitle(value)
    onChange(e)
  }

  const onKeyDownEditHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (saveForm) {
        saveForm()
      }
    }
  }

  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeHandler}
      variant="outlined"
      onKeyDown={onKeyDownEditHandler}
      inputProps={{
        style: { padding: '8px 6px' },
      }}
      error={error}
      helperText={helperText}
      {...muiProps}
    />
  ) : (
    <Typography sx={{ paddingRight: '8px' }} variant="h6" {...muiProps}>
      {props.title}
    </Typography>
  )
})
