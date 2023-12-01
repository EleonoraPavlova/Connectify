
import { PostItem } from "src/state/initialState"
import { addPostAC, initialState, profileReducer } from "./profileReducer"


test("reducer should add post", () => {
  let state: PostItem[] = initialState

  let endState = profileReducer(state, addPostAC("This is the text for the post"))

  expect(state.length).toBe(7)
  expect(endState.length).toBe(8)
  expect(endState[0].title).toBe("This is a post")
  expect(endState[0].post).toBe("This is the text for the post")
})
