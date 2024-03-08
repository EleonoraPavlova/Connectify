import { ResponseUsers, UserStatuses, usersApi } from 'api/usersApi'
import { setAppStatusAC } from '../appSlice/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { followApi } from 'api/followApi'
import { PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppRootState } from 'state/store'
import { clearUsers } from 'actions/actions'

export type ResponseDomain = ResponseUsers & {
  isLoader: boolean
}

export enum ResultCode { //enum  ONLY for reading, can't be overwritten!!
  SUCCEEDED = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10,
}

export const initialStateUsers: ResponseDomain = {
  items: [],
  totalCount: 0,
  error: '',
  isLoader: false,
}

export const setResponseTC = createAsyncThunk(
  'users/setResponse',
  async (
    params: {
      pageSize: number
      currentPage: number
      friend?: boolean
      isLoader?: boolean
    },
    { dispatch, rejectWithValue }
  ) => {
    const { pageSize, currentPage, friend = false, isLoader = false } = params
    dispatch(switchLoaderAC({ isLoader: !isLoader }))
    dispatch(setAppStatusAC({ statusApp: 'loading' }))

    try {
      const res = await usersApi.getUsers(pageSize, currentPage, friend)
      if (res.data.items.length) {
        // dispatch(setResponseAC({ response: res.data }))
        dispatch(setAppStatusAC({ statusApp: 'succeeded' }))
        return { response: res.data }
      } else {
        dispatch(setAppStatusAC({ statusApp: 'failed' }))
        handleServerAppError(res.data, dispatch)
        return rejectWithValue({})
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(error as { message: string }, dispatch)
      return rejectWithValue({})
    } finally {
      dispatch(switchLoaderAC({ isLoader }))
    }
  }
)

export const unFollowUserTC = createAsyncThunk(
  'users/unFollowUser',
  async (params: { userId: number; followed: boolean }, { dispatch, rejectWithValue }) => {
    const { userId, followed } = params
    dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
    try {
      const res = await followApi.unFollowTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(toggleFollowUserAC({ id: userId, followed }))
        dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
        return { id: userId, followed }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
      return rejectWithValue(null)
    }
  }
)

export const toggleFollowUserTC = createAsyncThunk(
  'users/toggleFollowUser',
  async (params: { userId: number; followed: boolean }, { dispatch, rejectWithValue }) => {
    const { userId, followed } = params
    dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
    try {
      const res = await followApi.followTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(toggleFollowUserAC({ id: userId, followed }))
        dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
        return { id: userId, followed }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
      return rejectWithValue(null)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {
    switchLoaderAC(state, action: PayloadAction<{ isLoader: boolean }>) {
      state.isLoader = action.payload.isLoader
    },
    setFollowingInProgressAC(state, action: PayloadAction<{ followingInProgress: UserStatuses; userId: number }>) {
      const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
      if (userToUpdate) userToUpdate.followingInProgress = action.payload.followingInProgress
    },
    increaseLikeCounterAC(state, action: PayloadAction<{ userId: number }>) {
      const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
      if (userToUpdate) userToUpdate.likeCounter += 1
    },
    decreaseLikeCounterAC(state, action: PayloadAction<{ userId: number }>) {
      const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
      if (userToUpdate) userToUpdate.likeCounter -= 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setResponseTC.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload.response,
        }
      })
      .addCase(unFollowUserTC.fulfilled, (state, action) => {
        const userToUpdate = state.items.find((u) => u.id === action.payload?.id)
        if (userToUpdate) userToUpdate.followed = !action.payload?.followed
      })
      .addCase(toggleFollowUserTC.fulfilled, (state, action) => {
        const userToUpdate = state.items.find((u) => u.id === action.payload?.id)
        if (userToUpdate) userToUpdate.followed = !action.payload?.followed
      })
      .addCase(clearUsers, (state, action) => {
        console.log('state/clearUsers', current(state))
        return initialStateUsers
      })
  },
  selectors: {
    selectUsersIsLoader: (sliceState) => sliceState.isLoader,
    selectUsersItems: (sliceState) => sliceState.items,
    selectUsersTotalCount: (sliceState) => sliceState.totalCount,
  },
})

export const usersReducer = usersSlice.reducer
export const { switchLoaderAC, setFollowingInProgressAC, increaseLikeCounterAC, decreaseLikeCounterAC } =
  usersSlice.actions
export const { selectUsersIsLoader, selectUsersItems, selectUsersTotalCount } = usersSlice.getSelectors(
  (rootState: AppRootState) => rootState.users
)
// export const usersReducer = (
//   state: ResponseDomain = initialState,
//   action: UsersActionsType
// ): ResponseDomain => {
//   switch (action.type) {
//     case 'TOGGLE-FOLLOWED-USERS':
//       return {
//         ...state,
//         items: state.items.map((u) => (u.id === action.id ? { ...u, followed: !action.followed } : u)),
//       }
//     case 'SET-RESPONSE':
//       return {
//         ...state,
//         ...action.response,
//         items: action.response.items.map((user) => ({ ...user, likeCounter: 0 })),
//       }
//     case 'SWITCH-LOADER':
//       return { ...state, isLoader: action.isLoader }
//     case 'SET-USER-FOLLOWING-IN-PROGRESS':
//       return {
//         ...state,
//         items: state.items.map((u) =>
//           u.id === action.userId ? { ...u, followingInProgress: action.followingInProgress } : u
//         ),
//       }
//     case 'INCREASE-LIKE-COUNTER':
//       return {
//         ...state,
//         items: state.items.map((u) => (u.id === action.userId ? { ...u, likeCounter: u.likeCounter + 1 } : u)),
//       }
//     case 'DECREASE-LIKE-COUNTER':
//       return {
//         ...state,
//         items: state.items.map((u) => (u.id === action.userId ? { ...u, likeCounter: u.likeCounter - 1 } : u)),
//       }
//     case 'CLEAR-RESPONSE':
//       return initialState
//     default:
//       return state
//   }
// }

//actions
// export const setResponseAC = (response: ResponseUsers) => {
//   return {
//     type: 'SET-RESPONSE',
//     response,
//   } as const
// }

// export const toggleFollowUserAC = (id: number, followed: boolean) => {
//   return {
//     type: 'TOGGLE-FOLLOWED-USERS',
//     id,
//     followed,
//   } as const
// }

// export const switchLoaderAC = (isLoader: boolean) => {
//   return {
//     type: 'SWITCH-LOADER',
//     isLoader,
//   } as const
// }

// export const setFollowingInProgressAC = (followingInProgress: UserStatuses, userId: number) => {
//   return {
//     type: 'SET-USER-FOLLOWING-IN-PROGRESS',
//     followingInProgress,
//     userId,
//   } as const
// }

// export const increaseLikeCounterAC = (userId: number) => {
//   return {
//     type: 'INCREASE-LIKE-COUNTER',
//     userId,
//   } as const
// }

// export const decreaseLikeCounterAC = (userId: number) => {
//   return {
//     type: 'DECREASE-LIKE-COUNTER',
//     userId,
//   } as const
// }

// export const setUserStatusAC = (status: ResponseUsers) => {// ?
//   return {
//     type: 'SET-STATUS',
//     status,
//   } as const
// }

// export const clearResponseAC = () => {
//   return {
//     type: 'CLEAR-RESPONSE',
//   } as const
// }

//thunk
// export const setResponseTC =
//   (pageSize: number, currentPage: number, friend: boolean = false, isLoader: boolean = false): AppThunk =>
//     async (dispatch) => {
//       dispatch(switchLoaderAC({!isLoader}))
//     dispatch(setAppStatusAC({ statusApp:'loading'}))
//     try {
//       const res = await usersApi.getUsers(pageSize, currentPage, friend)
//       if (res.data.items.length) {
//         dispatch(setResponseAC({ res.data)})
//         dispatch(setAppStatusAC({statusApp: 'succeeded'}))
//       } else {
//         dispatch(setAppStatusAC({ statusApp:'failed'}))
//         handleServerAppError(res.data, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//     dispatch(switchLoaderAC({ isLoader }))
//   }

// export const unFollowUserTC =
//   (userId: number, followed: boolean): AppThunk =>
//   async (dispatch) => {
//     dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
//     try {
//       const res = await followApi.unFollowTo(userId)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(toggleFollowUserAC({ id: userId, followed }))
//         dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//         dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//       dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
//     }
//   }

// export const toggleFollowUserTC =
//   (userId: number, followed: boolean): AppThunk =>
//   async (dispatch) => {
//     dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
//     try {
//       const res = await followApi.followTo(userId)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(toggleFollowUserAC({ id: userId, followed }))
//         dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//         dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//       dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
//     }
//   }
