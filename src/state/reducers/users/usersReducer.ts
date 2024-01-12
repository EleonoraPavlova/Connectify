import { followApi } from "src/api/followApi"
import { ResponseUsersType, UserStatuses, usersApi } from "src/api/usersApi"
import { setErrorAppAC, setStatusAppAC } from "../app-reducer/app-reducer"
import { AppThunk } from "src/state/store"
import { handleServerAppError, handleServerNetworkError } from "src/utils/error-utils"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetResponse = ReturnType<typeof setResponseAC>
export type SwitchLoader = ReturnType<typeof switchLoaderAC>
export type ClearResponse = ReturnType<typeof clearResponseAC>
export type SetStatusUser = ReturnType<typeof setStatusUserAC>


type UsersActionsType = FollowUsers | SetResponse | SwitchLoader | ClearResponse | SetStatusUser

export type ResponseDomainType = ResponseUsersType & {
  isLoader: boolean
}

export enum ResultCode { //enum  ONLY for reading, cannot be overwritten!!
  SUCCEEDED = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10
}

export const initialState: ResponseDomainType = {
  items: [],
  totalCount: 0,
  error: "",
  isLoader: false
}

export const usersReducer = (state: ResponseDomainType = initialState, action: UsersActionsType): ResponseDomainType => {
  switch (action.type) {
    case "TOGGLE-FOLLOWED-USERS":
      return { ...state, items: state.items.map(u => u.id === action.id ? { ...u, followed: !action.followed } : u) }
    case "SET-RESPONSE":
      return { ...state, ...action.response }
    case "SWITCH-LOADER":
      return { ...state, isLoader: action.isLoader }
    case "SET-USERS-STATUS":
      return { ...state, items: state.items.map(u => u.id === action.userId ? { ...u, statusUser: action.statusUser } : u) }
    case "CLEAR-RESPONSE":
      return initialState
    default:
      return state;
  }
}

//actions
export const setResponseAC = (response: ResponseUsersType) => {
  return {
    type: 'SET-RESPONSE', response
  } as const
}

export const toggleFollowUserAC = (id: number, followed: boolean) => {
  return {
    type: 'TOGGLE-FOLLOWED-USERS', id, followed
  } as const
}

export const switchLoaderAC = (isLoader: boolean) => {
  return {
    type: 'SWITCH-LOADER', isLoader
  } as const
}

export const setStatusUserAC = (statusUser: UserStatuses, userId: number) => {
  return {
    type: 'SET-USERS-STATUS', statusUser, userId
  } as const
}

export const clearResponseAC = () => {
  return {
    type: 'CLEAR-RESPONSE',
  } as const
}

//thunk
export const setResponseTC = (count: number, page: number, friend: boolean, isLoader: boolean = false): AppThunk =>
  async dispatch => {
    dispatch(switchLoaderAC(!isLoader))
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await usersApi.getUsers(count, page, friend)
      dispatch(setResponseAC(res.data))
      if (res.data.items.length) {
        dispatch(setStatusAppAC("succeeded"))
      } else {
        dispatch(setStatusAppAC("failed"))
        handleServerAppError(res.data, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
    dispatch(switchLoaderAC(isLoader))
  }



export const unFollowUserTC = (userId: number, followed: boolean): AppThunk =>
  async dispatch => {
    dispatch(setStatusUserAC("loading", userId))
    try {
      const res = await followApi.unFollowTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(toggleFollowUserAC(userId, followed))
        dispatch(setStatusUserAC("succeeded", userId))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setStatusUserAC("failed", userId))
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setStatusUserAC("failed", userId))
    }
  }


export const toggleFollowUserTC = (userId: number, followed: boolean): AppThunk =>
  async dispatch => {
    dispatch(setStatusUserAC("loading", userId))
    try {
      const res = await followApi.followTo(userId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(toggleFollowUserAC(userId, followed))
        dispatch(setStatusUserAC("succeeded", userId))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setStatusUserAC("failed", userId))
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
      dispatch(setStatusUserAC("failed", userId))
    }
  }