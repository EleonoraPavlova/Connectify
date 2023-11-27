import dataState, { UsersPage, usersItem } from "src/state/initialState"
import { v1 } from "uuid"

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
      const addedUser: usersItem = {
        id: v1(),
        topic: "Added",
        firstName: "Leo",
        lastName: "King",
        followed: true,
        src: "https://avatarko.ru/img/kartinka/1/morda_lva.jpg",
        location: {
          city: "Milano",
          country: "Italy",
        }
      }
      return { ...state, usersData: [...state.usersData, addedUser] }
    default:
      return state;
  }
}


export const toggleFollowUserAC = (id: string, followed: boolean) => {
  return {
    type: 'CHANGE-FOLLOWED-USERS', id, followed
  } as const
}

export const setUsersAC = () => {
  return {
    type: 'SET-USERS'
  } as const
}
