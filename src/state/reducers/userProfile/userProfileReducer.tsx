import { Dispatch } from "redux"
import { ProfileUserContactsType, ResponseProfileUserType, userProfileApi } from "src/api/profileApi"
import { ResponseUsersType, UserPhotosType } from "src/api/usersApi"
import { SwitchLoader, switchLoaderAC } from "../users/usersReducer"

export type SetProfileUser = ReturnType<typeof setProfileUserAC>

type UserActionsType = SetProfileUser | SwitchLoader


export const initialState: ResponseProfileUserType = {
  userId: 0,
  lookingForAJob: false,
  lookingForAJobDescription: "",
  fullName: "",
  contacts: {} as ProfileUserContactsType,
  photos: {} as UserPhotosType
}

export const userProfileReducer = (state: ResponseProfileUserType = initialState, action: UserActionsType): ResponseProfileUserType => {
  switch (action.type) {
    case "SET-PROFILE-USER":
      return action.response
    default:
      return state;
  }
}

//actions
export const setProfileUserAC = (response: ResponseProfileUserType) => {
  return {
    type: 'SET-PROFILE-USER', response
  } as const
}


//thunk
export const getProfileUserTC = (userId: number, isLoader: boolean = false) => {
  return (dispatch: Dispatch) => {
    dispatch(switchLoaderAC(!isLoader))
    userProfileApi.getProfileUser(userId)
      .then((res) => {
        dispatch(setProfileUserAC(res.data))
      })
      .finally(() => dispatch(switchLoaderAC(isLoader)))
  }
}