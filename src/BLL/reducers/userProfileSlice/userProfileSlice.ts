import { userProfileApi } from 'DAL/profileApi'
import { createSlice, current, isAnyOf, isFulfilled } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { ExtendedInitialResponseProfileUser, ProfileUserContacts, ResponseProfileUser, UserPhotos } from 'common/types'
import { AppRootState } from 'BLL/store'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

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
      .addMatcher(isFulfilled(getProfileUserStatusTC, updateProfileUserStatusTC), (state, action: any) => {
        state.status = action.payload.status
      })
      .addMatcher(
        isAnyOf(getProfileUserTC.fulfilled, updateProfileUserTC.fulfilled, updateProfileUserPhotoTC.fulfilled),
        (state, action: any) => {
          if (action.type === getProfileUserTC.fulfilled.type) {
            return { status: state.status, ...action.payload.response }
          }
          if (action.type === updateProfileUserPhotoTC.fulfilled.type) {
            return { ...state, photos: action.payload }
          }
          if (action.type === updateProfileUserTC.fulfilled.type) {
            return { ...state, ...action.payload }
          }
          return state
        }
      )
      .addMatcher(isAnyOf(clearUsers), (state) => {
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

const updateProfileUserTC = createAppAsyncThunk<ResponseProfileUser | undefined, { params: ResponseProfileUser }>(
  `${userSlice.name}/updateProfileUser`,
  async (payload, { getState, rejectWithValue }) => {
    const { params } = payload
    const state = getState() as AppRootState
    const meId = state.app.meId
    if (!meId) return

    const apiModel: ResponseProfileUser = {
      ...params,
      userId: meId,
    }

    const res = await userProfileApi.updateProfileUser(apiModel)

    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      return apiModel
    } else {
      return rejectWithValue(res.data)
    }
  }
)

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

const updateProfileUserPhotoTC = createAppAsyncThunk<UserPhotos, UserPhotos>(
  `${userSlice.name}/updateProfileUserPhoto`,
  async (params, { rejectWithValue }) => {
    const res = await userProfileApi.updateProfileUserPhoto(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      return res.data.data.photos
    } else {
      return rejectWithValue(res.data.messages)
    }
  }
)

export const userProfileReducer = userSlice.reducer
export const userThunks = {
  getProfileUserTC,
  getProfileUserStatusTC,
  updateProfileUserTC,
  updateProfileUserStatusTC,
  updateProfileUserPhotoTC,
}
export const { selectUserProfile, selectUserProfileStatus } = userSlice.getSelectors(
  (rootState: AppRootState) => rootState.userProfile
)
