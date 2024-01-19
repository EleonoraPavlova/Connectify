import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks-selectors";
import { RequestStatusType, setErrorAppAC, setStatusAppAC } from "src/state/reducers/app-reducer/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarComponent() {
  let error = useAppSelector<string | null>(state => state.app.error)
  let statusApp = useAppSelector<RequestStatusType>(state => state.app.statusApp)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(setErrorAppAC(null))
    dispatch(setStatusAppAC("idle"))
  }

  if (!error) {
    return null
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <Snackbar open={!!error || !!statusApp} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusApp === "succeeded" ? "success" : "error"} sx={{ width: '100%' }}>
          {statusApp === "succeeded" ? statusApp : error}
        </Alert>
      </Snackbar>
    </Stack >
  );
}