import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice/appSlice'
import { ResultCode, clearResponseAC } from '../usersSlice/usersSlice'
import { LoginParamsType, authApi } from 'api/authApi'
import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppRootState } from 'state/store'

export type initialParamsAuth = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
}

export const loginTC = createAsyncThunk(
  'auth/login',
  async (params: LoginParamsType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        // dispatch(setLoginParamsAC({ params }))
        // dispatch(setResponseTC(count, page, friend)); //
        dispatch(setAppSuccessAC({ success: 'you have successfully logged in' }))
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
  }
)

export const logOutTC = createAsyncThunk('auth/logOut', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ statusApp: 'loading' }))
  try {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
      dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      dispatch(clearResponseAC())
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
    // setLoginParamsAC(state, action: PayloadAction<{ params: LoginParamsType }>) {
    //   const { email, password, rememberMe } = action.payload.params
    //   state.email = email
    //   state.password = password
    //   state.rememberMe = rememberMe
    //   state.isLoggedIn = rememberMe
    // },
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

// export const authReducer = (state = initialParamsAuth, action: AuthActionType): initialParamsAuthType => {
//   switch (action.type) {
//     case 'LOGIN/SET-IS-LOGGED-IN':
//       return { ...state, isLoggedIn: action.isLoggedIn }
//     case 'LOGIN/SET-LOGIN-PARAMS':
//       return { ...state, ...action.params }
//     default:
//       return state
//   }
// }

// export const setLoginParamsAC = (params: LoginParamsType) => {
//   return {
//     type: 'LOGIN/SET-LOGIN-PARAMS',
//     params,
//   } as const
// }

//thunks
// export const loginTC =
//   (params: LoginParamsType): AppThunk =>
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
