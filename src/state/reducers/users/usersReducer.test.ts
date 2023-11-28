
import { toggleFollowUserAC } from "./usersReducer"
import { usersReducer } from "./usersReducer"
import { UserTypeApi, UserPhotosType } from "../../../api/usersApi"


const mockUserPhotos: UserPhotosType = {
  small: 'mock_small_photo_url',
  large: 'mock_large_photo_url',
};

test("reducer should toggle follow status", () => {
  let state: UserTypeApi[] = [{
    id: 1,
    name: "Eleonora",
    status: "done",
    photos: mockUserPhotos,
    followed: true
  },
  {
    id: 2,
    name: "Herman",
    status: "process",
    photos: mockUserPhotos,
    followed: true
  },
  ]

  let endState = usersReducer(state, toggleFollowUserAC(state[0].id, false))

  expect(state.length).toBe(2)
  expect(endState[0].followed).toBe(false)
})
