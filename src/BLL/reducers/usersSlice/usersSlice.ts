import { usersApi } from 'DAL/usersApi'
import { followApi } from 'DAL/followApi'
import { PayloadAction, createSlice, current, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { clearUsers } from 'BLL/actions/actions'
import { ResultCode } from 'common/emuns'
import { QueryParamsGetUsers, ResponseUsers, UserStatuses } from 'common/types'
import { replaceRussianLetters } from 'common/utils/translator'
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
      .addMatcher(isPending(), (state) => {
        state.isLoader = true
      })
      .addMatcher(isFulfilled(), (state) => {
        state.isLoader = false
      })
      .addMatcher(isRejected(), (state) => {
        state.isLoader = false
      })
      .addMatcher(isAnyOf(setResponseTC.fulfilled), (state, action) => {
        const { items } = action.payload.response
        items.forEach((u) => {
          u.likeCounter = Math.floor(Math.random() * (100 - 1) + 1)
        })
        return {
          ...state,
          ...action.payload.response,
        }
      })
      .addMatcher(isFulfilled(unFollowUserTC, toggleFollowUserTC), (state, action) => {
        const userToUpdate = state.items.find((u) => u.id === action.payload.userId)
        if (userToUpdate) userToUpdate.followed = !action.payload.followed
      })
      .addMatcher(isAnyOf(clearUsers), (state) => {
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
  { params: QueryParamsGetUsers } // pageSize / current page /friend
>(`${usersSlice.name}/setResponse`, async (payload, { rejectWithValue }) => {
  const res = await usersApi.getUsers(payload.params)
  if (res.data.items.length) {
    res.data.items.forEach((u) => {
      u.name = replaceRussianLetters(u.name)
      u.status = replaceRussianLetters(u.status)
    })
    return { response: res.data }
  } else {
    return rejectWithValue(res.data)
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
        dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
        return rejectWithValue(res.data)
      }
    } catch (err) {
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
        dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
        return rejectWithValue(res.data)
      }
    } catch (err) {
      dispatch(setFollowingInProgressAC({ followingInProgress: 'failed', userId }))
      return rejectWithValue(null)
    }
  }
)

export const usersReducer = usersSlice.reducer
export const usersThunks = { setResponseTC, toggleFollowUserTC, unFollowUserTC }
export const { setFollowingInProgressAC, increaseLikeCounterAC, decreaseLikeCounterAC } = usersSlice.actions
export const { selectUsersIsLoader, selectUsersItems, selectUsersTotalCount } = usersSlice.getSelectors(
  (rootState: AppRootState) => rootState.users
)
