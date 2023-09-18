import { addMessageAC, dialogsPageReducer, initialState } from "src/reducer/dialogsPageReducer"
import { Messages } from "src/state/dataState"


test("reducer should add message", () => {
  //data
  let state: Messages[] = initialState

  //action
  let endState = dialogsPageReducer(state, addMessageAC("This is a new message"))

  // expection
  expect(state.length).toBe(7)
  expect(endState.length).toBe(8)
  expect(endState[0].message).toBe("This is a new message")
})
