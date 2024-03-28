import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch } from '../../state/hooks/selectors'
import { selectAppError, selectAppStatus, setAppErrorAC, setAppStatusAC } from 'state/reducers/appSlice/appSlice'
import { useSelector } from 'react-redux'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function SnackBar() {
  let error = useSelector(selectAppError)
  let statusApp = useSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(setAppErrorAC({ error: null }))
    dispatch(setAppStatusAC({ statusApp: 'idle' }))
  }

  if (!error) return null

  return (
    <Stack sx={{ width: '100%' }}>
      <Snackbar open={!!error || !!statusApp} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusApp === 'succeeded' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {statusApp === 'succeeded' ? statusApp : error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
