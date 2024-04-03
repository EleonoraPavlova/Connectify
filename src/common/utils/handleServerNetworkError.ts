import { setAppErrorAC, setAppStatusAC } from 'BLL/reducers/appSlice'
import { Dispatch } from 'redux'

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: err.message ? err.message : 'Some error occurred' })) //вывод серверной ошибки
  dispatch(setAppStatusAC({ status: 'failed' }))
}
