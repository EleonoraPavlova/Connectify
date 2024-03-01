import { DialogsPage } from 'state/initialState'
import { addMessageAC, dialogsPageReducer, initialState } from './dialogsPageReducer'

test('reducer should add message', () => {
  //data
  let state: DialogsPage = initialState

  //action
  let endState = dialogsPageReducer(state, addMessageAC('This is a new message'))

  // expection
  expect(state.messagesData.length).toBe(7)
  expect(endState.messagesData.length).toBe(8)
  expect(endState.messagesData[endState.messagesData.length - 1].message).toBe('This is a new message')
})
