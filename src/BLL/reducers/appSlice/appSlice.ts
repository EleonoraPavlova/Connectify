import { authApi } from 'DAL/authApi'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearMeId } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { setIsLoggedInAC } from '../authSlice'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { AppRootState } from 'BLL/store'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed' //server interaction status

type AppInitial = {
  status: RequestStatus
  error: string | null
  success: string | null
  initialized: boolean
  meId: number | null
}

const appInitial: AppInitial = {
  status: 'idle',
  error: null,
  success: null,
  initialized: false, //(проверка куки, настроек пользователя)
  meId: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitial,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppSuccessAC(state, action: PayloadAction<{ success: string | null }>) {
      state.success = action.payload.success
    },
    setMeIdAC(state, action: PayloadAction<{ meId: number | null }>) {
      state.meId = action.payload.meId
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAppInitializeTC.fulfilled, (state) => {
        state.initialized = true
      })
      .addCase(clearMeId, () => {
        return appInitial
      })
  },
  selectors: {
    selectAppStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectAppSuccess: (sliceState) => sliceState.success,
    selectAppInitialized: (sliceState) => sliceState.initialized,
    selectAppMeId: (sliceState) => sliceState.meId,
  },
})

const setAppInitializeTC = createAppAsyncThunk<{ initialized: boolean }, void>(
  `${appSlice.name}/appInitialize`,
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authApi.authMe()
      // anonymous user or authorization
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        dispatch(setMeIdAC({ meId: res.data.data.id }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
      return { initialized: true }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(error as { message: string }, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const appReducer = appSlice.reducer
export const appThunks = { setAppInitializeTC }
export const { setAppStatusAC, setAppErrorAC, setAppSuccessAC, setMeIdAC } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppSuccess, selectAppInitialized, selectAppMeId } =
  appSlice.getSelectors((rootState: AppRootState) => rootState.app)
