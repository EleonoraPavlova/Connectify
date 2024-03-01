import dataState, { DialogsPage } from 'state/initialState'
import { v1 } from 'uuid'

export type AddMessage = ReturnType<typeof addMessageAC>
export type UpdateMessage = ReturnType<typeof UpdateMessageAC>
export type SendMessage = ReturnType<typeof SendMessageAC>

type ActionsType = AddMessage | UpdateMessage | SendMessage

export const initialState = dataState.dialogsPage

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const dialogsPageReducer = (state: DialogsPage = initialState, action: ActionsType): DialogsPage => {
  switch (action.type) {
    case 'ADD-MESSAGE':
      let newMessage = {
        id: v1(),
        message: action.textValue,
      }
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      }
    case 'UPDATE-MESSAGE':
      return {
        ...state,
        messagesData: state.messagesData.map((m) =>
          m.id === action.messageId ? { ...m, message: action.textValue } : m
        ),
      }
    case 'SEND-MESSAGE':
      return state
    default:
      return state
  }
}

export const addMessageAC = (textValue: string) => {
  return {
    type: 'ADD-MESSAGE',
    textValue,
  } as const
}

export const UpdateMessageAC = (textValue: string, messageId: string) => {
  return {
    type: 'UPDATE-MESSAGE',
    textValue,
    messageId,
  } as const
}

export const SendMessageAC = (textValue: string, messageId: string) => {
  return {
    type: 'SEND-MESSAGE',
    textValue,
    messageId,
  } as const
}
