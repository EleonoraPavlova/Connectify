import { authApi } from 'DAL/authApi'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearMeId, clearUsers } from 'BLL/actions/actions'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/emuns'
import { AppRootState } from 'BLL/store'
import { appThunks, setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

type AuthInitial = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false, //залогин пользователь или нет
  } satisfies AuthInitial as AuthInitial,
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

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setAppSuccessAC({ success: 'you have successfully logged in' }))
        dispatch(appThunks.setAppInitializeTC())
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue('Mistake')
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue(error.message)
    }
  }
)

const logOutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${authSlice.name}/logOut`,
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authApi.logOut()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(clearMeId())
        dispatch(clearUsers())
        dispatch(appThunks.setAppInitializeTC())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue({})
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(error as { message: string }, dispatch)
      return rejectWithValue({})
    }
  }
)

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.getSelectors((rootState: AppRootState) => rootState.auth)
