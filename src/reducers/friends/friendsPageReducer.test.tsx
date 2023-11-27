
import { FriendItem } from "src/state/initialState"
import { addFriendAC, friendsPageReducer, initialState } from "./friendsPageReducer"


test("reducer should add new friend", () => {
  //data
  let state: FriendItem[] = initialState

  //action
  let endState = friendsPageReducer(state, addFriendAC("Victor", "EEEEEyy"))

  // expection
  expect(state.length).toBe(7)
  expect(endState.length).toBe(8)
  expect(endState[0].name).toBe("Victor")
  expect(endState[0].lastName).toBe("EEEEEyy")
})
