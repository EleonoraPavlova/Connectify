import { authApi } from "src/api/authApi"
import { AppThunk } from "src/state/store"
import { ResultCode } from "../users/usersReducer"
import { setIsLoggedInAC } from "../auth/authReducer"
import { handleServerAppError, handleServerNetworkError } from "src/utils/error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'//server interaction status


export type InitialStateType = {
  statusApp: RequestStatusType,
  error: string | null,
  success: string | null,
  initialized: boolean,
  meId: number | null
}

export type SetErrorApp = ReturnType<typeof setErrorAppAC>
export type SetStatusApp = ReturnType<typeof setStatusAppAC>
export type SetSuccessApp = ReturnType<typeof setSuccessAppAC>
export type SetInitializeApp = ReturnType<typeof setInitializeAppAC>
export type SetMeId = ReturnType<typeof setMeIdAC>

export type ActionAppType = SetErrorApp | SetStatusApp | SetSuccessApp
  | SetInitializeApp
  | SetMeId

export const appInitialStatusState: InitialStateType = {
  statusApp: 'idle',
  error: null,
  success: null,
  initialized: false, //(проверка куки, настроек пользователя)
  meId: null
}


export const appReducer = (state: InitialStateType = appInitialStatusState, action: ActionAppType): InitialStateType => {
  switch (action.type) {
    case "SET-APP-ERROR":
      return { ...state, error: action.error }
    case "SET-APP-STATUS":
      return { ...state, statusApp: action.statusApp }
    case "SET-APP-SUCCESS":
      return { ...state, success: action.success }
    case "SET-APP-INITIALIZE":
      return { ...state, initialized: action.initialized }
    case "SET-ME-ID":
      return { ...state, meId: action.meId }
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

export const setStatusAppAC = (statusApp: RequestStatusType) => {
  return {
    type: "SET-APP-STATUS",
    statusApp
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

export const setMeIdAC = (meId: number | null) => {
  return {
    type: "SET-ME-ID",
    meId
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
        dispatch(setMeIdAC(res.data.data.id))
        dispatch(setStatusAppAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch);
    } finally {
      dispatch(setInitializeAppAC(true))
    }
  }