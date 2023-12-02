import { Dispatch } from "redux"
import { followApi } from "src/api/followApi"
import { ResponseUsersType, usersApi } from "src/api/usersApi"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetResponse = ReturnType<typeof setResponseAC>
export type SetCurrentPage = ReturnType<typeof setCurrentPageAC>
export type pagesCount = ReturnType<typeof pagesCountAC>


type UsersActionsType = FollowUsers | SetResponse | SetCurrentPage | pagesCount

export type ResponseDomainType = ResponseUsersType & {
  currentPage: number
  pagesCount: number
}

export const initialState: ResponseDomainType = {
  items: [],
  totalCount: 0,
  error: "",
  currentPage: 1,
  pagesCount: 15
}

export const usersReducer = (state: ResponseDomainType = initialState, action: UsersActionsType): ResponseDomainType => {
  switch (action.type) {
    case "TOGGLE-FOLLOWED-USERS":
      return { ...state, items: state.items.map(u => u.id === action.id ? { ...u, followed: !action.followed } : u) }
    case "SET-RESPONSE":
      return { ...state, ...action.response }
    case "SET-CURRENT-PAGE":
      return { ...state, currentPage: action.currentPage }
    case "SET-PAGES-COUNT":
      const pageSize = 15
      return { ...state, pagesCount: Math.ceil(action.totalCount / pageSize) }
    default:
      return state;
  }
}
// // const pagesCount = Math.ceil(totalCount / 15)
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

export const pagesCountAC = (totalCount: number) => {
  return {
    type: 'SET-PAGES-COUNT', totalCount
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