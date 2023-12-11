import { Dispatch } from "redux"
import { followApi } from "src/api/followApi"
import { ResponseUsersType, usersApi } from "src/api/usersApi"
import { setErrorAppAC, setStatusAppAC } from "../app-reducer/app-reducer"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetResponse = ReturnType<typeof setResponseAC>
export type SwitchLoader = ReturnType<typeof switchLoaderAC>


type UsersActionsType = FollowUsers | SetResponse | SwitchLoader

export type ResponseDomainType = ResponseUsersType & {
  isLoader: boolean
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


//thunk
export const setResponseTC = (count: number, page: number, friend: boolean, isLoader: boolean = false) => {
  return (dispatch: Dispatch) => {
    dispatch(switchLoaderAC(!isLoader))
    dispatch(setStatusAppAC("loading"))
    usersApi.getUsers(count, page, friend)
      .then((res) => {
        dispatch(setResponseAC(res.data))
        dispatch(setStatusAppAC("succeeded"))
      })
      .finally(() => dispatch(switchLoaderAC(isLoader)))
  }
}

export const unFollowUserTC = (userId: number, followed: boolean) => {
  return (dispatch: Dispatch) => {
    followApi.unFollowTo(userId)
      .then((res) => {
        dispatch(toggleFollowUserAC(userId, followed))
      })
  }
}

export const toggleFollowUserTC = (userId: number, followed: boolean) => {
  return (dispatch: Dispatch) => {
    followApi.followTo(userId)
      .then((res) => {
        dispatch(toggleFollowUserAC(userId, followed))
      })
  }
}