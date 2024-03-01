import { AppThunk } from '../../store'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { setStatusAppAC, setSuccessAppAC } from '../app-reducer/appReducer'
import { LoginParamsType, authApi } from 'src/api/authApi'
import { ResultCode, clearResponseAC } from '../users/usersReducer'

export type AuthActionType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setLogginParamsAC>

export type initialParamsAuthType = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
}

const initialParamsAuth: initialParamsAuthType = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false, //залогин пользователь или нет
}

export const authReducer = (state = initialParamsAuth, action: AuthActionType): initialParamsAuthType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'LOGIN/SET-LOGIN-PARAMS':
      return { ...state, ...action.params }
    default:
      return state
  }
}

//action creator
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn,
  } as const
}

export const setLogginParamsAC = (params: LoginParamsType) => {
  return {
    type: 'LOGIN/SET-LOGIN-PARAMS',
    params,
  } as const
}

//thunks
export const LoginTC =
  (params: LoginParamsType): AppThunk =>
  async (dispatch) => {
    dispatch(setStatusAppAC('loading'))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setLogginParamsAC(params))
        // dispatch(setResponseTC(count, page, friend)); //
        dispatch(setSuccessAppAC('you have successfully logged in'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }

export const LogOutTC = (): AppThunk => async (dispatch) => {
  dispatch(setStatusAppAC('loading'))
  try {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setSuccessAppAC('you have successfully logged out'))
      dispatch(setStatusAppAC('succeeded'))
      dispatch(clearResponseAC())
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err as { message: string }, dispatch)
  }
}
