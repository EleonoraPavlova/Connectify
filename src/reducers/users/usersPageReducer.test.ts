
import { UsersPage } from "src/state/initialState"
import { initialState, toggleFollowUserAC } from "./usersPageReducer"
import { usersPageReducer } from "./usersPageReducer"


test("reducer should toggle follow status", () => {
  //data
  let state: UsersPage = initialState

  //action
  let endState = usersPageReducer(state, toggleFollowUserAC(initialState.usersData[0].id, true))

  // expection
  expect(state.usersData.length).toBe(7)
  expect(endState.usersData[0].followed).toBe(false)
})
