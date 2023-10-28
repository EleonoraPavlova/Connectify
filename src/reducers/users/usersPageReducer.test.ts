
import { usersItem } from "src/state/dataState"
import { initialState } from "./usersPageReducer"
import { FollowUsersAC, usersPageReducer } from "./usersPageReducer"


test("reducer should add new friend", () => {
  //data
  let state: usersItem[] = initialState

  //action
  let endState = usersPageReducer(state, FollowUsersAC("id"))

  // expection
  expect(state.length).toBe(7)
  // expect(endState.length).toBe(8)
  // expect(endState[0].name).toBe("Victor")
  // expect(endState[0].lastName).toBe("EEEEEyy")
})
