import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { setAppInitializeTC, setAppStatusAC, setAppSuccessAC } from '../appSlice/appSlice'
import { ResultCode } from '../usersSlice/usersSlice'
import { authApi } from 'DAL/authApi'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppRootState } from 'state/store'
import { clearMeId, clearUsers } from 'BLL/actions/actions'
import { LoginParams } from 'common/types'

export type initialParamsAuth = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
}

export const loginTC = createAsyncThunk('auth/login', async (params: LoginParams, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ statusApp: 'loading' }))
  try {
    const res = await authApi.login(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      // dispatch(setLoginParamsAC({ params }))
      dispatch(setAppSuccessAC({ success: 'you have successfully logged in' }))
      dispatch(setAppInitializeTC())
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue('Mistake')
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue(error.message)
  }
})

export const logOutTC = createAsyncThunk('auth/logOut', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ statusApp: 'loading' }))
  try {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
      dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      dispatch(clearMeId())
      dispatch(clearUsers())
      dispatch(setAppInitializeTC())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({})
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(error as { message: string }, dispatch)
    return rejectWithValue({})
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false, //залогин пользователь или нет
  } satisfies initialParamsAuth as initialParamsAuth,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = true
      })
      .addCase(logOutTC.fulfilled, (state, action) => {
        state.isLoggedIn = false
      })
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.getSelectors((rootState: AppRootState) => rootState.auth)

//thunks
// export const loginTC =
//   (params: LoginParams): AppThunk =>
//   async (dispatch) => {
//     dispatch(setAppStatusAC({ statusApp: 'loading' }))
//     try {
//       const res = await authApi.login(params)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(setIsLoggedInAC(true))
//         dispatch(setLoginParamsAC(params))
//         // dispatch(setResponseTC(count, page, friend)); //
//         dispatch(setAppSuccessAC('you have successfully logged in'))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }

// export const logOutTC = (): AppThunk => async (dispatch) => {
//   dispatch(setAppStatusAC({ statusApp: 'loading' }))
//   try {
//     const res = await authApi.logOut()
//     if (res.data.resultCode === ResultCode.SUCCEEDED) {
//       dispatch(setIsLoggedInAC({ isLoggedIn: false }))
//       dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
//       dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
//       dispatch(clearResponseAC())
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   } catch (err) {
//     handleServerNetworkError(err as { message: string }, dispatch)
//   }
// }
