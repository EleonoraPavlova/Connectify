import { usersApi } from 'DAL/usersApi'
import { followApi } from 'DAL/followApi'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { QueryParamsGetUsers, ResponseUsers, UserStatuses } from 'common/types'
import { replaceRussianLetters } from 'common/utils/translator'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { AppRootState } from 'BLL/store'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

type ResponseDomain = ResponseUsers & {
  isLoader: boolean
}

type ArgFollowUnFollow = {
  userId: number
  followed: boolean
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
        const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
        if (userToUpdate) userToUpdate.followed = !action.payload.followed
      })
      .addCase(toggleFollowUserTC.fulfilled, (state, action) => {
        const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
        if (userToUpdate) userToUpdate.followed = !action.payload.followed
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

const setResponseTC = createAppAsyncThunk<
  { response: ResponseUsers },
  { params: QueryParamsGetUsers; isLoader: boolean }
>(`${usersSlice.name}/setResponse`, async (payload, { dispatch, rejectWithValue }) => {
  const { isLoader } = payload
  dispatch(switchLoaderAC({ isLoader: !isLoader }))
  // dispatch(setAppStatusAC({ status: 'loading' }))

  try {
    const res = await usersApi.getUsers(payload.params) // pageSize / current page /friend
    if (res.data.items.length) {
      res.data.items.forEach((u) => {
        u.name = replaceRussianLetters(u.name)
        u.status = replaceRussianLetters(u.status)
      })
      // dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { response: res.data }
    } else {
      // dispatch(setAppStatusAC({ status: 'failed' }))
      return rejectWithValue(res.data)
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(error as { message: string }, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(switchLoaderAC({ isLoader: isLoader }))
  }
})

const unFollowUserTC = createAppAsyncThunk<ArgFollowUnFollow, ArgFollowUnFollow>(
  `${usersSlice.name}/unFollowUser`,
  async (params, { dispatch, rejectWithValue }) => {
    const { userId } = params
    dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
    try {
      const res = await followApi.unFollowTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
        return params
      } else {
        handleServerAppError(res.data.messages, dispatch)
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

const toggleFollowUserTC = createAppAsyncThunk<ArgFollowUnFollow, ArgFollowUnFollow>(
  `${usersSlice.name}/toggleFollowUser`,
  async (params, { dispatch, rejectWithValue }) => {
    const { userId } = params
    dispatch(setFollowingInProgressAC({ followingInProgress: 'loading', userId }))
    try {
      const res = await followApi.followTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setFollowingInProgressAC({ followingInProgress: 'succeeded', userId }))
        return params
      } else {
        handleServerAppError(res.data.messages, dispatch)
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
