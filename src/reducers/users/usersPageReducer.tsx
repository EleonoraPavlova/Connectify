import dataState, { UsersPage, usersItem } from "src/state/dataState"

export type FollowUsers = ReturnType<typeof toggleFollowUserAC>
export type SetUsers = ReturnType<typeof setUsersAC>

type ActionsType = FollowUsers | SetUsers

export const initialState = dataState.usersPage

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const usersPageReducer = (state: UsersPage = initialState, action: ActionsType): UsersPage => {
  switch (action.type) {
    case "CHANGE-FOLLOWED-USERS":
      return { ...state, usersData: state.usersData.map(u => u.id === action.id ? { ...u, followed: !action.followed } : u) }
    case "SET-USERS":
      return { ...state, usersData: [...state.usersData, ...action.users] }
    default:
      return state;
  }
}


export const toggleFollowUserAC = (id: string, followed: boolean) => {
  return {
    type: 'CHANGE-FOLLOWED-USERS', id, followed
  } as const
}

export const setUsersAC = (users: []) => {
  return {
    type: 'SET-USERS', users
  } as const
}
