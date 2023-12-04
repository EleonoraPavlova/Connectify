import { Dispatch } from "redux"
import { ProfileUserContactsType, ResponseProfileUserType, userProfileApi } from "src/api/profileApi"
import { ResponseUsersType, UserPhotosType } from "src/api/usersApi"

export type SetProfileUser = ReturnType<typeof setProfileUserAC>

type UserActionsType = SetProfileUser


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
export const getProfileUserTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    userProfileApi.getProfileUser(userId)
      .then((res) => {
        dispatch(setProfileUserAC(res.data))
      })
  }
}