import { addMessageAC, dialogsPageReducer, initialState } from "src/reducers/dialogs/dialogsPageReducer"
import { DialogsPage } from "src/state/dataState"


test("reducer should add message", () => {
  //data
  let state: DialogsPage = initialState

  //action
  let endState = dialogsPageReducer(state, addMessageAC("This is a new message"))

  // expection
  expect(state.messagesData.length).toBe(7)
  expect(endState.messagesData.length).toBe(8)
  expect(endState.messagesData[endState.messagesData.length - 1].message).toBe("This is a new message")
})
