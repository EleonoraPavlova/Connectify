import { log } from "console"
import { Dispatch } from "redux"
import { followApi } from "src/api/followApi"
import { UserTypeApi, usersApi } from "src/api/usersApi"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetUsers = ReturnType<typeof setUsersAC>

type UsersActionsType = FollowUsers | SetUsers

export const initialState: UserTypeApi[] = []

export const usersReducer = (state: UserTypeApi[] = initialState, action: UsersActionsType): UserTypeApi[] => {
  switch (action.type) {
    case "TOGGLE-FOLLOWED-USERS":
      return state.map(u => u.id === action.id ? { ...u, followed: !action.followed } : u)
    case "SET-USERS":
      return action.users
    default:
      return state;
  }
}

//actions
export const toggleFollowUserAC = (id: number, followed: boolean) => {
  return {
    type: 'TOGGLE-FOLLOWED-USERS', id, followed
  } as const
}

export const setUsersAC = (users: UserTypeApi[]) => {
  return {
    type: 'SET-USERS', users
  } as const
}

//thunk
export const getUsersTC = (dispatch: Dispatch) => {
  usersApi.getUsers()
    .then((res) => {
      dispatch(setUsersAC(res.data.items))
    })
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
