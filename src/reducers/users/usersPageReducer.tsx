import dataState, { usersItem } from "src/state/dataState"
import { v1 } from "uuid"

export type FollowUsers = ReturnType<typeof FollowUsersAC>

type ActionsType = FollowUsers


export const initialState = dataState.usersPage.usersData

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const usersPageReducer = (state: usersItem[] = initialState, action: ActionsType): usersItem[] => {
  switch (action.type) {
    case "FOLLOW-USERS":
      return state

    default:
      return state;
  }
}

export const FollowUsersAC = (id: string) => {
  return {
    type: 'FOLLOW-USERS', id
  } as const
}
