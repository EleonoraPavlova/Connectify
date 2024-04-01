import { usersApi } from 'DAL/usersApi'
import { followApi } from 'DAL/followApi'
import { PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { ResponseUsers, UserStatuses } from 'common/types'
import { setAppStatusAC } from '../appSlice'
import { replaceRussianLetters } from 'common/utils/translator'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error'
import { AppRootState } from 'BLL/store'

type ResponseDomain = ResponseUsers & {
  isLoader: boolean
}

const initialUsers: ResponseDomain = {
  items: [],
  totalCount: 0,
  error: '',
  isLoader: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
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
        const { items } = action.payload.response
        items.forEach((u) => {
          u.likeCounter = Math.floor(Math.random() * (100 - 1) + 1)
        })
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
        return initialUsers
      })
  },
  selectors: {
    selectUsersIsLoader: (sliceState) => sliceState.isLoader,
    selectUsersItems: (sliceState) => sliceState.items,
    selectUsersTotalCount: (sliceState) => sliceState.totalCount,
  },
})

const setResponseTC = createAsyncThunk(
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
        res.data.items.forEach((u) => {
          u.name = replaceRussianLetters(u.name)
          u.status = replaceRussianLetters(u.status)
        })
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

const unFollowUserTC = createAsyncThunk(
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

const toggleFollowUserTC = createAsyncThunk(
  'users/toggleFollowUser',
  async (params: { userId: number; followed: boolean }, { dispatch, rejectWithValue }) => {
    const { userId, followed } = params
    dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
    try {
      const res = await followApi.followTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
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

export const usersReducer = usersSlice.reducer
export const usersThunks = { setResponseTC, toggleFollowUserTC, unFollowUserTC }
export const { switchLoaderAC, setFollowingInProgressAC, increaseLikeCounterAC, decreaseLikeCounterAC } =
  usersSlice.actions
export const { selectUsersIsLoader, selectUsersItems, selectUsersTotalCount } = usersSlice.getSelectors(
  (rootState: AppRootState) => rootState.users
)
