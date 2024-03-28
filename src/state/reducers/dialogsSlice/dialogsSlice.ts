import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dataState from 'state/initialState'
import { v1 } from 'uuid'

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: dataState.dialogsPage,
  reducers: {
    addMessageAC(state, action: PayloadAction<{ text: string }>) {
      state.messagesData.unshift({
        id: v1(),
        message: action.payload.text,
      })
    },
    sendMessageAC(state, action: PayloadAction<{ text: string; messageId: string }>) {
      const { text, messageId } = action.payload

      const messageIndex = state.messagesData.findIndex((message) => message.id === messageId)
      if (messageIndex !== -1) {
        state.messagesData[messageIndex].message = text
      }
    },

    updateMessageAC(state, action: PayloadAction<{ text: string; messageId: string }>) {
      const { text, messageId } = action.payload

      const messageIndex = state.messagesData.findIndex((message) => message.id === messageId)
      if (messageIndex !== -1) {
        state.messagesData[messageIndex].message = text
      }
    },
  },
})

export const dialogsReducer = dialogsSlice.reducer
export const { addMessageAC, sendMessageAC } = dialogsSlice.actions
export const {} = dialogsSlice.selectors
