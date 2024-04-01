import { userProfileApi } from 'DAL/profileApi'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { ExtendedInitialResponseProfileUser, ProfileUserContacts, ResponseProfileUser, UserPhotos } from 'common/types'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error'
import { switchLoaderAC } from '../usersSlice'
import { AppRootState } from 'BLL/store'

const initialUser: ExtendedInitialResponseProfileUser = {
  userId: 0,
  lookingForAJob: false,
  lookingForAJobDescription: '',
  fullName: '',
  contacts: {} as ProfileUserContacts,
  photos: {} as UserPhotos,
  status: '',
  aboutMe: 'About me',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileUserTC.fulfilled, (state, action) => {
        return { status: state.status, ...action.payload.response }
      })
      .addCase(getProfileUserStatusTC.fulfilled, (state, action) => {
        state.status = action.payload.status
      })
      .addCase(updateProfileUserTC.fulfilled, (state, action) => {
        state = { ...state, ...action.payload?.params }
      })
      .addCase(updateProfileUserStatusTC.fulfilled, (state, action) => {
        state.status = action.payload.status
      })
      .addCase(clearUsers, (state, action) => {
        console.log('state/clearUsers', current(state))
        return initialUser
      })
  },
  selectors: {
    selectUserProfile: (sliceState) => sliceState,
    selectUserProfileStatus: (sliceState) => sliceState.status,
  },
})

const getProfileUserTC = createAsyncThunk(
  `${userSlice.name}/getProfileUser`,
  async (params: { userId: number; isLoader?: boolean }, { dispatch, rejectWithValue }) => {
    const { userId, isLoader = false } = params

    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await userProfileApi.getProfileUser(userId)
      // dispatch(setProfileUserAC({ response: res.data }))
      dispatch(getProfileUserStatusTC({ userId }))
      dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      return { response: res.data }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(switchLoaderAC({ isLoader }))
    }
  }
)

const getProfileUserStatusTC = createAsyncThunk(
  `${userSlice.name}/getProfileUserStatus`,
  async (params: { userId: number; isLoader?: boolean }, { dispatch, rejectWithValue }) => {
    const { userId, isLoader = false } = params
    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await userProfileApi.getProfileUserStatus(userId)
      // dispatch(setProfileUserStatusAC({ status: res.data }))
      dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
      return { status: res.data }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(switchLoaderAC({ isLoader: isLoader }))
    }
  }
)

const updateProfileUserTC = createAsyncThunk(
  `${userSlice.name}/updateProfileUser`,
  async (payload: { params: ResponseProfileUser; isLoader?: boolean }, { dispatch, getState, rejectWithValue }) => {
    const { params, isLoader = false } = payload
    const state = getState() as AppRootState
    const meId = state.app.meId
    if (!meId) return

    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ statusApp: 'loading' }))

    const apiModel: ResponseProfileUser = {
      ...params,
      userId: meId,
    }

    try {
      const res = await userProfileApi.updateProfileUser(apiModel)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(updateProfileUserAC({ params: apiModel }))
        dispatch(setAppSuccessAC({ success: 'your profile was successfully updated' }))
        dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
        return { params: apiModel }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue({})
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(switchLoaderAC({ isLoader }))
    }
  }
)

const updateProfileUserStatusTC = createAsyncThunk(
  `${userSlice.name}/updateProfileUserStatus`,
  async (params: { status: string; isLoader?: boolean }, { dispatch, rejectWithValue }) => {
    const { status, isLoader = false } = params
    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ statusApp: 'loading' }))
    try {
      const res = await userProfileApi.updateProfileUserStatus(status)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(updateProfileUserStatusAC({ status }))
        dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
        return { status }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(switchLoaderAC({ isLoader }))
    }
  }
)

export const userProfileReducer = userSlice.reducer
export const userThunks = { getProfileUserTC, getProfileUserStatusTC, updateProfileUserTC, updateProfileUserStatusTC }
export const { selectUserProfile, selectUserProfileStatus } = userSlice.getSelectors(
  (rootState: AppRootState) => rootState.userProfile
)
