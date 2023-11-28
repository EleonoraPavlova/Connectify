import { Dispatch } from "redux"
import { UserTypeApi, usersApi } from "src/api/usersApi"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetUsers = ReturnType<typeof setUsersAC>

type UsersActionsType = FollowUsers | SetUsers

export const initialState: UserTypeApi[] = []

export const usersReducer = (state: UserTypeApi[] = initialState, action: UsersActionsType): UserTypeApi[] => {
  switch (action.type) {
    case "CHANGE-FOLLOWED-USERS":
      return state
    case "SET-USERS":
      return action.users
    default:
      return state;
  }
}


export const toggleFollowUserAC = (id: number, followed: boolean) => {
  return {
    type: 'CHANGE-FOLLOWED-USERS', id, followed
  } as const
}

export const setUsersAC = (users: UserTypeApi[]) => {
  return {
    type: 'SET-USERS', users
  } as const
}

export const getUsersTC = (dispatch: Dispatch) => {
  usersApi.getUsers()
    .then((res) => {
      dispatch(setUsersAC(res.data.items))
    })
}

// export const toggleFollowUserTC = (dispatch: Dispatch) => {
//   usersApi.getUsers()
//     .then((res) => {
//       dispatch(setUsersAC(res.data))
//     })
// }
