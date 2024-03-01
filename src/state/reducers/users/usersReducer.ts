import { ResponseUsersType, UserStatuses, usersApi } from 'api/usersApi'
import { setAppStatusAC } from '../appSlice/appSlice'
import { AppThunk } from 'state/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { followApi } from 'api/followApi'

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetResponse = ReturnType<typeof setResponseAC>
export type SwitchLoader = ReturnType<typeof switchLoaderAC>
export type ClearResponse = ReturnType<typeof clearResponseAC>
export type SetfollowingInProgress = ReturnType<typeof setFollowingInProgressAC>
export type IncreaseLikeCounter = ReturnType<typeof increaseLikeCounterAC>
export type DecreaseLikeCounter = ReturnType<typeof decreaseLikeCounterAC>
export type SetUserStatus = ReturnType<typeof setUserStatusAC>

type UsersActionsType =
  | FollowUsers
  | SetResponse
  | SwitchLoader
  | ClearResponse
  | SetfollowingInProgress
  | IncreaseLikeCounter
  | DecreaseLikeCounter
  | SetUserStatus

export type ResponseDomainType = ResponseUsersType & {
  isLoader: boolean
}

export enum ResultCode { //enum  ONLY for reading, cannot be overwritten!!
  SUCCEEDED = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10,
}

export const initialState: ResponseDomainType = {
  items: [],
  totalCount: 0,
  error: '',
  isLoader: false,
}

export const usersReducer = (
  state: ResponseDomainType = initialState,
  action: UsersActionsType
): ResponseDomainType => {
  switch (action.type) {
    case 'TOGGLE-FOLLOWED-USERS':
      return {
        ...state,
        items: state.items.map((u) => (u.id === action.id ? { ...u, followed: !action.followed } : u)),
      }
    case 'SET-RESPONSE':
      return {
        ...state,
        ...action.response,
        items: action.response.items.map((user) => ({ ...user, likeCounter: 0 })),
      }
    case 'SWITCH-LOADER':
      return { ...state, isLoader: action.isLoader }
    case 'SET-USER-FOLLOWING-IN-PROGRESS':
      return {
        ...state,
        items: state.items.map((u) =>
          u.id === action.userId ? { ...u, followingInProgress: action.followingInProgress } : u
        ),
      }
    case 'INCREASE-LIKE-COUNTER':
      return {
        ...state,
        items: state.items.map((u) => (u.id === action.userId ? { ...u, likeCounter: u.likeCounter + 1 } : u)),
      }
    case 'DECREASE-LIKE-COUNTER':
      return {
        ...state,
        items: state.items.map((u) => (u.id === action.userId ? { ...u, likeCounter: u.likeCounter - 1 } : u)),
      }
    case 'CLEAR-RESPONSE':
      return initialState
    default:
      return state
  }
}

//actions
export const setResponseAC = (response: ResponseUsersType) => {
  return {
    type: 'SET-RESPONSE',
    response,
  } as const
}

export const toggleFollowUserAC = (id: number, followed: boolean) => {
  return {
    type: 'TOGGLE-FOLLOWED-USERS',
    id,
    followed,
  } as const
}

export const switchLoaderAC = (isLoader: boolean) => {
  return {
    type: 'SWITCH-LOADER',
    isLoader,
  } as const
}

export const setFollowingInProgressAC = (followingInProgress: UserStatuses, userId: number) => {
  return {
    type: 'SET-USER-FOLLOWING-IN-PROGRESS',
    followingInProgress,
    userId,
  } as const
}

export const increaseLikeCounterAC = (userId: number) => {
  return {
    type: 'INCREASE-LIKE-COUNTER',
    userId,
  } as const
}

export const decreaseLikeCounterAC = (userId: number) => {
  return {
    type: 'DECREASE-LIKE-COUNTER',
    userId,
  } as const
}

export const setUserStatusAC = (status: ResponseUsersType) => {
  return {
    type: 'SET-STATUS',
    status,
  } as const
}

export const clearResponseAC = () => {
  return {
    type: 'CLEAR-RESPONSE',
  } as const
}

//thunk
export const setResponseTC =
  (pageSize: number, currentPage: number, friend: boolean = false, isLoader: boolean = false): AppThunk =>
  async (dispatch) => {
    dispatch(switchLoaderAC(!isLoader))
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await usersApi.getUsers(pageSize, currentPage, friend)
      if (res.data.items.length) {
        dispatch(setResponseAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
    dispatch(switchLoaderAC(isLoader))
  }

export const unFollowUserTC =
  (userId: number, followed: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(setFollowingInProgressAC('loading', userId))
    try {
      const res = await followApi.unFollowTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(toggleFollowUserAC(userId, followed))
        dispatch(setFollowingInProgressAC('succeeded', userId))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setFollowingInProgressAC('failed', userId))
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setFollowingInProgressAC('failed', userId))
    }
  }

export const toggleFollowUserTC =
  (userId: number, followed: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(setFollowingInProgressAC('loading', userId))
    try {
      const res = await followApi.followTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(toggleFollowUserAC(userId, followed))
        dispatch(setFollowingInProgressAC('succeeded', userId))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setFollowingInProgressAC('failed', userId))
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setFollowingInProgressAC('failed', userId))
    }
  }
