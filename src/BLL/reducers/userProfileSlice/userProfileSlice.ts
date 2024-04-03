import { userProfileApi } from 'DAL/profileApi'
import { createSlice, current } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import {
  ExtendedInitialResponseProfileUser,
  ParamsProfileUser,
  ProfileUserContacts,
  ResponseProfileUser,
  UserPhotos,
} from 'common/types'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { switchLoaderAC } from '../usersSlice'
import { AppRootState } from 'BLL/store'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { log } from 'console'

export const initialUser: ExtendedInitialResponseProfileUser = {
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
        console.log(action.payload)
        return (state = { ...state, ...action.payload })
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

const getProfileUserTC = createAppAsyncThunk<{ response: ResponseProfileUser }, ParamsProfileUser>(
  `${userSlice.name}/getProfileUser`,
  async (params, { dispatch, rejectWithValue }) => {
    const { userId, isLoader = false } = params

    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await userProfileApi.getProfileUser(userId)
      dispatch(getProfileUserStatusTC({ userId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { response: res.data }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(switchLoaderAC({ isLoader }))
    }
  }
)

const getProfileUserStatusTC = createAppAsyncThunk<{ status: string }, ParamsProfileUser>(
  `${userSlice.name}/getProfileUserStatus`,
  async (params, { dispatch, rejectWithValue }) => {
    const { userId, isLoader = false } = params
    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await userProfileApi.getProfileUserStatus(userId)
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { status: res.data }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(switchLoaderAC({ isLoader: isLoader }))
    }
  }
)

const updateProfileUserTC = createAppAsyncThunk<
  ExtendedInitialResponseProfileUser | undefined,
  { params: ExtendedInitialResponseProfileUser; isLoader?: boolean }
>(`${userSlice.name}/updateProfileUser`, async (payload, { dispatch, getState, rejectWithValue }) => {
  const { params } = payload
  const state = getState() as AppRootState
  const meId = state.app.meId
  if (!meId) return

  dispatch(switchLoaderAC({ isLoader: !payload.isLoader }))
  dispatch(setAppStatusAC({ status: 'loading' }))

  const apiModel: ExtendedInitialResponseProfileUser = {
    ...params,
    userId: meId,
  }

  try {
    const res = await userProfileApi.updateProfileUser(apiModel)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'your profile was successfully updated' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return apiModel
    } else {
      handleServerAppError(res.data.messages, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(switchLoaderAC({ isLoader: payload.isLoader }))
  }
})

const updateProfileUserStatusTC = createAppAsyncThunk<{ status: string }, { status: string; isLoader?: boolean }>(
  `${userSlice.name}/updateProfileUserStatus`,
  async (params, { dispatch, rejectWithValue }) => {
    const { status, isLoader = false } = params

    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await userProfileApi.updateProfileUserStatus(status)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { status }
      } else {
        handleServerAppError(res.data.messages, dispatch)
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
