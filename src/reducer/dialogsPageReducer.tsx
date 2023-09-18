import dataState, { Messages } from "src/state/dataState"
import { v1 } from "uuid"


export type AddMessage = ReturnType<typeof addMessageAC>

type ActionsType = AddMessage


export const initialState = dataState.dialogsPage.messagesData

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const dialogsPageReducer = (state: Messages[] = initialState, action: ActionsType): Messages[] => {
  switch (action.type) {
    case "ADD-MESSAGE":
      let newMessage = {
        id: v1(),
        message: action.textValue
      }
      return [newMessage, ...state]
    default:
      throw new Error("error!");

  }
}

export const addMessageAC = (textValue: string) => {
  return {
    type: 'ADD-MESSAGE', textValue
  }
}