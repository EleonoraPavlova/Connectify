import { ResponseFollowType } from 'api/followApi'
import { ResponseUsersType } from 'api/usersApi'
import { Dispatch } from 'redux'
import { setErrorAppAC, setStatusAppAC } from 'state/reducers/app-reducer/appReducer'

export const handleServerAppError = (
  data: ResponseUsersType | ResponseFollowType<{ userId: number } | {}>,
  dispatch: Dispatch
) => {
  if ('items' in data && data.items.length) {
    dispatch(setErrorAppAC(data.error)) //вывод серверной ошибки
  } else {
    dispatch(setErrorAppAC('Some error occurred')) //если ошибка с сервера не пришла
  }
  dispatch(setStatusAppAC('failed'))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setErrorAppAC(err.message ? err.message : 'Some error occurred')) //вывод серверной ошибки
  dispatch(setStatusAppAC('failed'))
}
