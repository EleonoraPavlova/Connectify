import { ResponseDomainType, toggleFollowUserAC } from "./usersReducer"
import { usersReducer } from "./usersReducer"


test("reducer should toggle follow status", () => {
  let state: ResponseDomainType = {
    items: [
      {
        "name": "Shubert",
        "id": 1,
        "photos": {
          "small": "",
          "large": ""
        },
        "status": "",
        statusUser: "idle",
        "followed": false
      },
      {
        "name": "Hacker",
        "id": 2,
        "photos": {
          "small": "",
          "large": ""
        },
        "status": "",
        statusUser: "loading",
        "followed": false
      }
    ],
    totalCount: 30,
    error: "",
    isLoader: false
  }


  let endState = usersReducer(state, toggleFollowUserAC(1, false))

  expect(state.items[0].id).toBe(1)
  expect(endState.items[0].followed).toBe(true)
  expect(endState.items[0].statusUser).toBe("idle")
  expect(endState.items[1].statusUser).toBe("loading")
})