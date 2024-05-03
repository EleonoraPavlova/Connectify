import { authApi } from 'DAL/authApi'
import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { clearMeId, clearUsers } from 'BLL/actions/actions'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/emuns'
import { AppRootState } from 'BLL/store'
import { appThunks, setAppSuccessAC } from '../appSlice'
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(loginTC, logOutTC, appThunks.setAppInitializeTC), (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
})

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  async (params, { dispatch, rejectWithValue }) => {
    // dispatch(setAppStatusAC({ status: 'loading' }))
    const res = await authApi.login(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'you have successfully logged in' }))
      dispatch(appThunks.setAppInitializeTC())
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const logOutTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${authSlice.name}/logOut`,
  async (_, { dispatch, rejectWithValue }) => {
    // dispatch(setAppStatusAC({ status: 'loading' }))
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'you have successfully logged out' }))
      // dispatch(setAppStatusAC({ status: 'succeeded' }))
      dispatch(clearMeId())
      dispatch(clearUsers())
      dispatch(appThunks.setAppInitializeTC())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { selectIsLoggedIn } = authSlice.getSelectors((rootState: AppRootState) => rootState.auth)
