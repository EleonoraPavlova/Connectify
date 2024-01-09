import { authApi } from "src/api/authApi"
import { AppThunk } from "src/state/store"
import { ResultCode, setResponseTC } from "../users/usersReducer"
import { setIsLoggedInAC } from "../auth/authReducer"
import { handleServerAppError, handleServerNetworkError } from "src/utils/error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'//server interaction status


export type InitialStateType = {
  status: RequestStatusType,
  error: string | null,
  success: string | null
  initialized: boolean
}

export type SetErrorApp = ReturnType<typeof setErrorAppAC>
export type SetStatusApp = ReturnType<typeof setStatusAppAC>
export type SetSuccessApp = ReturnType<typeof setSuccessAppAC>
export type SetInitializeApp = ReturnType<typeof setInitializeAppAC>

export type ActionAppType = SetErrorApp | SetStatusApp | SetSuccessApp | SetInitializeApp

export const appInitialStatusState: InitialStateType = {
  status: 'idle',
  error: null,
  success: null,
  initialized: false //(проверка куки, настроек пользователя)
}


export const appReducer = (state: InitialStateType = appInitialStatusState, action: ActionAppType): InitialStateType => {
  switch (action.type) {
    case "SET-APP-ERROR":
      return { ...state, error: action.error }
    case "SET-APP-STATUS":
      return { ...state, status: action.status }
    case "SET-APP-SUCCESS":
      return { ...state, success: action.success }
    case "SET-APP-INITIALIZE":
      return { ...state, initialized: action.initialized }
    default: return { ...state }
  }
}

//action creator
export const setErrorAppAC = (error: string | null) => {
  return {
    type: "SET-APP-ERROR",
    error
  } as const
}

export const setStatusAppAC = (status: RequestStatusType) => {
  return {
    type: "SET-APP-STATUS",
    status
  } as const
}

export const setSuccessAppAC = (success: string | null) => {
  return {
    type: "SET-APP-SUCCESS",
    success
  } as const
}

export const setInitializeAppAC = (initialized: boolean) => {
  return {
    type: "SET-APP-INITIALIZE",
    initialized
  } as const
}


export const setInitializeAppTC = (): AppThunk =>
  async dispatch => {
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await authApi.authMe()
      // анонимный пользователь или авториз
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setStatusAppAC("succeeded"))
        // dispatch(setResponseTC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch);
    } finally {
      dispatch(setInitializeAppAC(true))
    }
  }