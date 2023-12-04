import { ResponseProfileUserType } from "src/api/profileApi"
import { setProfileUserAC, userProfileReducer } from "./userProfileReducer"


type mocContctsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

type mocPhotosType = {
  small: string;
  large: string;
}



test("reducer should toggle follow status", () => {
  let state: ResponseProfileUserType = {
    userId: 0,
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
    }
  };


  let endState = userProfileReducer(state, setProfileUserAC(
    {
      userId: 1,
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
      }
    }
  ))

  expect(state.userId).toBe(0)
  expect(endState.userId).toBe(2)
  expect(endState.fullName).toBe("Eleonora")
  expect(endState.photos.small).toBe("smallPhoto")
})