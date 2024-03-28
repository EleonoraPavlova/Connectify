import { switchLoaderAC } from '../usersSlice/usersSlice'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice/appSlice'
import { userProfileApi } from 'DAL/profileApi'
import { AppRootState } from 'state/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { ProfileUserContacts, ResponseProfileUser, UserPhotos } from 'common/types'

export type ExtendedInitialState = ResponseProfileUser & {
  status: string
  aboutMe: string | null
}

export const initialStateUser: ExtendedInitialState = {
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
  initialState: initialStateUser,
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
        return initialStateUser
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
export const {} = userSlice.actions
export const { selectUserProfile, selectUserProfileStatus } = userSlice.getSelectors(
  (rootState: AppRootState) => rootState.userProfile
)

// export const userProfileReducer = (
//   state: ExtendedInitialState = initialState,
//   action: UserActionsType
// ): ExtendedInitialState => {
//   switch (action.type) {
//     case 'GET-PROFILE-USER-STATUS':
//       return { ...state, status: action.status }
//     case 'UPDATE-PROFILE-USER-STATUS':
//       return { ...state, status: action.status }
//     case 'SET-PROFILE-USER':
//       return {
//         ...state,
//         ...action.response,
//         contacts: {
//           ...action.response.contacts,
//           facebook: action.response.contacts?.facebook || 'https://www.facebook.com',
//           github: action.response.contacts?.github || 'https://github.com',
//           instagram: action.response.contacts?.instagram || 'https://www.instagram.com',
//           vk: action.response.contacts?.vk || 'https://vk.com',
//           youtube: action.response.contacts?.youtube || 'https://www.youtube.com',
//           twitter: action.response.contacts?.twitter || 'https://twitter.com',
//           website: action.response.contacts?.website || 'https://www.asos.com/',
//           mainLink: action.response.contacts?.mainLink || 'https://fontawesome.com',
//         },
//       }
//     case 'UPDATE-PROFILE-USER':
//       return { ...state, ...action.params }
//     default:
//       return state
//   }
// }

// export const updateProfileUserStatusAC = (status: string) => {
//   return {
//     type: 'UPDATE-PROFILE-USER-STATUS',
//     status,
//   } as const
// }

//thunk
// export const getProfileUserTC =
//   (userId: number, isLoader: boolean = false): AppThunk =>
//   async (dispatch) => {
//     dispatch(switchLoaderAC({ isLoader: !isLoader }))
//     dispatch(setAppStatusAC({ statusApp: 'loading' }))
//     try {
//       const res = await userProfileApi.getProfileUser(userId)
//       dispatch(setProfileUserAC({ response: res.data }))
//       dispatch(getProfileUserStatusTC(userId))
//       dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//     dispatch(switchLoaderAC({ isLoader }))
//   }

// export const getProfileUserStatusTC =
//   (userId: number, isLoader: boolean = false): AppThunk =>
//   async (dispatch) => {
//     dispatch(switchLoaderAC({ isLoader: !isLoader }))
//     dispatch(setAppStatusAC({ statusApp: 'loading' }))
//     try {
//       const res = await userProfileApi.getProfileUserStatus(userId)
//       dispatch(setProfileUserStatusAC({ status: res.data }))
//       dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//     dispatch(switchLoaderAC({ isLoader: isLoader }))
//   }

// export const updateProfileUserTC =
//   (params: ResponseProfileUser, isLoader: boolean = false): AppThunk =>
//   async (dispatch, getState: () => AppRootState) => {
//     const state = getState()
//     const meId = state.app.meId
//     if (!meId) return

//     dispatch(switchLoaderAC({ isLoader: !isLoader }))
//     dispatch(setAppStatusAC({ statusApp: 'loading' }))

//     const apiModel: ResponseProfileUser = {
//       ...params,
//       userId: meId,
//     }

//     try {
//       const res = await userProfileApi.updateProfileUser(apiModel)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(updateProfileUserAC({ params: apiModel }))
//         dispatch(setAppSuccessAC({ success: 'your profile was successfully updated' }))
//         dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//     dispatch(switchLoaderAC({ isLoader }))
//   }

// export const updateProfileUserStatusTC =
//   (status: string, isLoader: boolean = false): AppThunk =>
//   async (dispatch) => {
//     dispatch(switchLoaderAC({ isLoader: !isLoader }))
//     dispatch(setAppStatusAC({ statusApp: 'loading' }))
//     try {
//       const res = await userProfileApi.updateProfileUserStatus(status)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(updateProfileUserStatusAC({ status }))
//         dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//     dispatch(switchLoaderAC({ isLoader }))
//   }
