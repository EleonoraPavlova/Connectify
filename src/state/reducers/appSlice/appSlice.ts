import { authApi } from 'DAL/authApi'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppRootState } from 'state/store'
import { setIsLoggedInAC } from '../authSlice/authSlice'
import { clearMeId } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed' //server interaction status

type AppInitial = {
  statusApp: RequestStatus
  error: string | null
  success: string | null
  initialized: boolean
  meId: number | null
}

const appInitial: AppInitial = {
  statusApp: 'idle',
  error: null,
  success: null,
  initialized: false, //(проверка куки, настроек пользователя)
  meId: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitial,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ statusApp: RequestStatus }>) {
      state.statusApp = action.payload.statusApp
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
    selectAppStatus: (sliceState) => sliceState.statusApp,
    selectAppError: (sliceState) => sliceState.error,
    selectAppSuccess: (sliceState) => sliceState.success,
    selectAppInitialized: (sliceState) => sliceState.initialized,
    selectAppMeId: (sliceState) => sliceState.meId,
  },
})

const setAppInitializeTC = createAsyncThunk(
  `${appSlice.name}/appInitialize`,
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await authApi.authMe()
      // анонимный пользователь или авториз
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        dispatch(setMeIdAC({ meId: res.data.data.id }))
        dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
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
