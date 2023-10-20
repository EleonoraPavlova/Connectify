import dataState, { FriendItem } from "src/state/dataState"
import { v1 } from "uuid"

export type AddFriend = ReturnType<typeof addFriendAC>
export type RemoveFriend = ReturnType<typeof RemoveFriendAC>


type ActionsType = AddFriend | RemoveFriend


export const initialState = dataState.friendsPage.friendsData

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const friendsPageReducer = (state: FriendItem[] = initialState, action: ActionsType): FriendItem[] => {
  switch (action.type) {
    case "ADD-FRIENDS":
      let newFriend = {
        name: action.name,
        id: v1(),
        lastName: action.lastName,
        src: 'https://img.freepik.com/free-photo/portrait-of-handsome-smiling-stylish-hipster-lumbersexual-businessman-model-man-dressed-in-jeans-jacket-clothes_158538-1733.jpg?size=626&ext=jpg&ga=GA1.1.37576039.1697807310&semt=ais'
      }
      return [newFriend, ...state]
    case "REMOVE-FRIENDS":
      return state;
    default:
      return state;
  }
}

export const addFriendAC = (name: string, lastName: string) => {
  return {
    type: 'ADD-FRIENDS', name, lastName
  } as const
}

export const RemoveFriendAC = () => {
  return {
    type: 'REMOVE-FRIENDS'
  } as const
}