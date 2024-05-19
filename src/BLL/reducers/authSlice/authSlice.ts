import { authApi } from 'DAL/authApi'
import { createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit'
import { clearMeId, clearUsers } from 'BLL/actions/actions'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/emuns'
import { AppRootState } from 'BLL/store'
import { appThunks } from '../appSlice'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { captchaApi } from 'DAL/securityApi'

type AuthInitial = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
  captchaUrl: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false, //Is the user logged in or not
    captchaUrl: '',
  } satisfies AuthInitial as AuthInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(loginTC, logOutTC, appThunks.setAppInitializeTC), (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addMatcher(isAnyOf(getCaptchaUrlTC.fulfilled), (state, action: any) => {
        state.captchaUrl = action.payload
      })
      .addMatcher(isAnyOf(logOutTC.fulfilled), (state) => {
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('users')
      })
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
    selectCaptcha: (sliceState) => sliceState.captchaUrl,
  },
})

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  async (params, { dispatch, rejectWithValue }) => {
    const res = await authApi.login(params)
    if (res.data.resultCode === ResultCode.ERROR_CAPTCHA) {
      dispatch(getCaptchaUrlTC())
    }
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
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
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(clearMeId())
      dispatch(clearUsers())
      dispatch(appThunks.setAppInitializeTC())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const getCaptchaUrlTC = createAppAsyncThunk(`${authSlice.name}/getCaptchaUrl`, async (_) => {
  const res = await captchaApi.getCaptcha()
  console.log('res.data.url', res.data.url)
  return res.data.url
})

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC, getCaptchaUrlTC }
export const { selectIsLoggedIn, selectCaptcha } = authSlice.getSelectors((rootState: AppRootState) => rootState.auth)
