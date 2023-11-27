
import { PostItem } from "src/state/initialState"
import { addPostAC, initialState, profilePageReducer } from "./profilePageReducer"


test("reducer should add post", () => {
  //data
  let state: PostItem[] = initialState

  //action
  let endState = profilePageReducer(state, addPostAC("This is the text for the post"))

  // expection
  expect(state.length).toBe(7)
  expect(endState.length).toBe(8)
  expect(endState[0].title).toBe("This is a post")
  expect(endState[0].post).toBe("This is the text for the post")
})
