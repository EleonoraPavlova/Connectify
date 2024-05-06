import { authApi } from 'DAL/authApi'
import { PayloadAction, createSlice, isAllOf, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { clearMeId } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { AppRootState } from 'BLL/store'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { authThunks } from '../authSlice'
import { userThunks } from '../userProfileSlice'

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
  initialized: false, //checking cookies, user settings
  meId: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitial,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status
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
      .addMatcher(isAnyOf(setAppInitializeTC.fulfilled, setAppInitializeTC.rejected), (state) => {
        state.initialized = true
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.type === authThunks.loginTC.fulfilled.type) {
          state.success = 'you have successfully logged in'
        }
        if (action.type === authThunks.logOutTC.fulfilled.type) {
          state.success = 'you have successfully logged out'
        }
        if (action.type === userThunks.updateProfileUserTC.fulfilled.type) {
          state.success = 'your profile was successfully updated'
        }
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = 'failed'
        if (action.type === setAppInitializeTC.rejected.type) return
        if (action.payload) {
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      })
      .addMatcher(isAllOf(clearMeId), () => {
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

const setAppInitializeTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${appSlice.name}/appInitialize`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authApi.authMe()
    // anonymous user or authorization
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setMeIdAC({ meId: res.data.data.id }))
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const appReducer = appSlice.reducer
export const appThunks = { setAppInitializeTC }
export const { setAppStatusAC, setAppSuccessAC, setAppErrorAC, setMeIdAC } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppSuccess, selectAppInitialized, selectAppMeId } =
  appSlice.getSelectors((rootState: AppRootState) => rootState.app)
