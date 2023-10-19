import dataState, { Messages } from "src/state/dataState"
import { v1 } from "uuid"

export type AddMessage = ReturnType<typeof addMessageAC>
export type UpdateMessage = ReturnType<typeof UpdateMessageAC>
export type SendMessage = ReturnType<typeof SendMessageAC>


type ActionsType = AddMessage | UpdateMessage | SendMessage


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
    case "UPDATE-MESSAGE":
      return state.map(m => m.id === action.messageId ? { ...m, message: action.textValue } : m);
    case "SEND-MESSAGE":
      return state;
    default:
      return state;
  }
}

export const addMessageAC = (textValue: string) => {
  return {
    type: 'ADD-MESSAGE', textValue
  } as const
}

export const UpdateMessageAC = (textValue: string, messageId: string) => {
  return {
    type: 'UPDATE-MESSAGE', textValue, messageId
  } as const
}

export const SendMessageAC = (textValue: string, messageId: string) => {
  return {
    type: 'SEND-MESSAGE', textValue, messageId
  } as const
}