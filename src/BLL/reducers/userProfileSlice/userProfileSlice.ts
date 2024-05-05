import { userProfileApi } from 'DAL/profileApi'
import { createSlice, current } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { ExtendedInitialResponseProfileUser, ProfileUserContacts, ResponseProfileUser, UserPhotos } from 'common/types'
import { setAppSuccessAC } from '../appSlice'
import { AppRootState } from 'BLL/store'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

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
      .addCase(clearUsers, (state) => {
        console.log('state/clearUsers', current(state))
        return initialUser
      })
  },
  selectors: {
    selectUserProfile: (sliceState) => sliceState,
    selectUserProfileStatus: (sliceState) => sliceState.status,
  },
})

const getProfileUserTC = createAppAsyncThunk<{ response: ResponseProfileUser }, Pick<ResponseProfileUser, 'userId'>>(
  `${userSlice.name}/getProfileUser`,
  async (params, { dispatch }) => {
    const { userId } = params
    const res = await userProfileApi.getProfileUser(userId)
    dispatch(getProfileUserStatusTC(params))
    return { response: res.data }
  }
)

const getProfileUserStatusTC = createAppAsyncThunk<{ status: string }, Pick<ResponseProfileUser, 'userId'>>(
  `${userSlice.name}/getProfileUserStatus`,
  async (params) => {
    const { userId } = params
    const res = await userProfileApi.getProfileUserStatus(userId)
    return { status: res.data }
  }
)

const updateProfileUserTC = createAppAsyncThunk<
  ExtendedInitialResponseProfileUser | undefined,
  { params: ExtendedInitialResponseProfileUser }
>(`${userSlice.name}/updateProfileUser`, async (payload, { dispatch, getState, rejectWithValue }) => {
  const { params } = payload
  const state = getState() as AppRootState
  const meId = state.app.meId
  if (!meId) return

  const apiModel: ExtendedInitialResponseProfileUser = {
    ...params,
    userId: meId,
  }

  const res = await userProfileApi.updateProfileUser(apiModel)
  if (res.data.resultCode === ResultCode.SUCCEEDED) {
    dispatch(setAppSuccessAC({ success: 'your profile was successfully updated' }))
    return apiModel
  } else {
    return rejectWithValue(res.data)
  }
})

const updateProfileUserStatusTC = createAppAsyncThunk<{ status: string }, { status: string }>(
  `${userSlice.name}/updateProfileUserStatus`,
  async (params, { rejectWithValue }) => {
    const { status } = params
    const res = await userProfileApi.updateProfileUserStatus(status)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      return { status }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const userProfileReducer = userSlice.reducer
export const userThunks = { getProfileUserTC, getProfileUserStatusTC, updateProfileUserTC, updateProfileUserStatusTC }
export const { selectUserProfile, selectUserProfileStatus } = userSlice.getSelectors(
  (rootState: AppRootState) => rootState.userProfile
)
