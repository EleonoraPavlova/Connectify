import { AppThunk } from '../../store';
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
// import { SetTodoListTC, clearTodoListAC } from "../todolists/todolists-reducer";
import { setStatusAppAC, setSuccessAppAC } from "../app-reducer/app-reducer";
import { LoginParamsType, authApi } from "src/api/authApi";
import { ResultCode } from "../users/usersReducer";

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>

export type initialParamsAuthType = {
  isLoggedIn: boolean
}

const initialParamsAuth: initialParamsAuthType = {
  isLoggedIn: false //залогин пользователь или нет
}

export const authReducer = (state = initialParamsAuth, action: AuthActionType): initialParamsAuthType => {
  switch (action.type) {
    case "LOGIN/IS-LOGIN-IN":
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

//action creator
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: "LOGIN/IS-LOGIN-IN", isLoggedIn
  } as const
}


//thunks
export const LoginTC = (params: LoginParamsType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))
        // dispatch(SetTodoListTC())
        dispatch(setSuccessAppAC("you have successfully logged in"))
        dispatch(setStatusAppAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const LogOutTC = (): AppThunk =>
  async dispatch => {
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await authApi.logOut()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setSuccessAppAC("you have successfully logged out"))
        dispatch(setStatusAppAC("succeeded"))
        // dispatch(clearTodoListAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }