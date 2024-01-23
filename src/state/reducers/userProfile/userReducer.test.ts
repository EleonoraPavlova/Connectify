import { ExtendedInitialStateType, setProfileUserAC, userProfileReducer } from "./userProfileReducer"

test("reducer should toggle follow status", () => {
  let state: ExtendedInitialStateType = {
    userId: 0,
    aboutMe: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    },
    photos: {
      small: "",
      large: "",
    },
    status: " "
  };


  let endState = userProfileReducer(state, setProfileUserAC(
    {
      userId: 1,
      aboutMe: "",
      lookingForAJob: true,
      lookingForAJobDescription: "wow",
      fullName: "Eleonora",
      contacts: {
        github: "",
        vk: "",
        facebook: "",
        instagram: "",
        twitter: "",
        website: "",
        youtube: "",
        mainLink: "",
      },
      photos: {
        small: "smallPhoto",
        large: "largePhoto",
      },
    },
  ))

  expect(state.userId).toBe(0)
  expect(endState.userId).toBe(2)
  expect(endState.fullName).toBe("Eleonora")
  expect(endState.photos ? endState.photos : null).toBe("smallPhoto")
})