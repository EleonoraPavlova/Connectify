import { Dispatch } from "redux"
import { followApi } from "src/api/followApi"
import { ResponseUsersType, UserTypeApi, usersApi } from "src/api/usersApi"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetResponse = ReturnType<typeof setResponseAC>
export type SetCurrentPage = ReturnType<typeof setCurrentPageAC>


type UsersActionsType = FollowUsers | SetResponse | SetCurrentPage

export type ResponseDomainType = ResponseUsersType & {
  currentPage: number
}

export const initialState: ResponseDomainType = {
  items: [],
  totalCount: 0,
  error: "",
  currentPage: 1
}

export const usersReducer = (state: ResponseDomainType = initialState, action: UsersActionsType): ResponseDomainType => {
  switch (action.type) {
    case "TOGGLE-FOLLOWED-USERS":
      return { ...state, items: state.items.map(u => u.id === action.id ? { ...u, followed: !action.followed } : u) }
    case "SET-RESPONSE":
      return { ...state, ...action.response }
    case "SET-CURRENT-PAGE":
      return { ...state, currentPage: action.currentPage }
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

export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: 'SET-CURRENT-PAGE', currentPage
  } as const
}

//thunk
export const getResponseTC = (count: number, page: number, friend: boolean) => {
  return (dispatch: Dispatch) => {
    usersApi.getUsers(count, page, friend)
      .then((res) => {
        dispatch(setResponseAC(res.data))
      })
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