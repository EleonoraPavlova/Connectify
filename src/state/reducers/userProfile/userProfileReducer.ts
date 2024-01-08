import { Dispatch } from "redux"
import { ProfileUserContactsType, ResponseProfileUserType, userProfileApi } from "src/api/profileApi"
import { ResponseUsersType, UserPhotosType } from "src/api/usersApi"
import { SwitchLoader, switchLoaderAC } from "../users/usersReducer"
import { AppThunk } from "src/state/store"
import { handleServerNetworkError } from "src/utils/error-utils"

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
export const getProfileUserTC = (userId: number, isLoader: boolean = false): AppThunk =>
  async dispatch => {
    dispatch(switchLoaderAC(!isLoader))
    try {
      const res = await userProfileApi.getProfileUser(userId)
      dispatch(setProfileUserAC(res.data))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
    dispatch(switchLoaderAC(isLoader))
  }