import { memo } from 'react'
import { Box, IconButton } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { SaveAsOutlined } from '@mui/icons-material'

type Props = {
  editMode: boolean
  saveForm: () => void
}

export const UserFormButton = memo(({ editMode, saveForm }: Props) => {
  return (
    <Box sx={{ height: '100%', alignSelf: 'baseline' }}>
      <IconButton
        color={'success'}
        aria-label="change text"
        onClick={(event) => {
          event.stopPropagation()
          saveForm()
        }}>
        {editMode ? <SaveAsOutlined fontSize={'small'} /> : <ModeEditOutlineOutlinedIcon fontSize={'small'} />}
      </IconButton>
    </Box>
  )
})
