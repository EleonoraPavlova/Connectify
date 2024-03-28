import { ResponseFollow, ResponseUsers } from 'common/types'
import { Dispatch } from 'redux'
import { setAppErrorAC, setAppStatusAC } from 'state/reducers/appSlice/appSlice'

export const handleServerAppError = (
  data: ResponseUsers | ResponseFollow<{ userId: number } | {}>,
  dispatch: Dispatch
) => {
  if ('items' in data && data.items.length) {
    dispatch(setAppErrorAC({ error: data.error })) //вывод серверной ошибки
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' })) //если ошибка с сервера не пришла
  }
  dispatch(setAppStatusAC({ statusApp: 'failed' }))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: err.message ? err.message : 'Some error occurred' })) //вывод серверной ошибки
  dispatch(setAppStatusAC({ statusApp: 'failed' }))
}
