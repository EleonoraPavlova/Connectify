import { Dispatch } from "redux"
import { ResponseFollowType } from "src/api/followApi"
import { ResponseUsersType } from "src/api/usersApi"
import { setErrorAppAC, setStatusAppAC } from "src/state/reducers/app-reducer/app-reducer"

export const handleServerAppError = (data: ResponseUsersType | ResponseFollowType<{ userId: number } | {}>, dispatch: Dispatch) => {
  if ('items' in data && data.items.length) {
    dispatch(setErrorAppAC(data.error))//вывод серверной ошибки
  } else {
    dispatch(setErrorAppAC("Some error occurred"))//если ошибка с сервера не пришла
  }
  dispatch(setStatusAppAC("failed"))
}


export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setErrorAppAC(err.message ? err.message : "Some error occurred"))//вывод серверной ошибки
  dispatch(setStatusAppAC("failed"))
}