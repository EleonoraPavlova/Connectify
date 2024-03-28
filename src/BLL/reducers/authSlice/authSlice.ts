import { authApi } from 'DAL/authApi'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearMeId, clearUsers } from 'BLL/actions/actions'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/emuns'
import { AppRootState } from 'BLL/store'
import { appThunks, setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error'

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

const loginTC = createAsyncThunk(
  `${authSlice.name}/login`,
  async (params: LoginParams, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        dispatch(setAppSuccessAC({ success: 'you have successfully logged in' }))
        dispatch(appThunks.setAppInitializeTC())
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

const logOutTC = createAsyncThunk(`${authSlice.name}/logOut`, async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ statusApp: 'loading' }))
  try {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
      dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      dispatch(clearMeId())
      dispatch(clearUsers())
      dispatch(appThunks.setAppInitializeTC())
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

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.getSelectors((rootState: AppRootState) => rootState.auth)
