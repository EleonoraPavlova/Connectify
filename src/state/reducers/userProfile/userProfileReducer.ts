import { ProfileUserContactsType, ResponseProfileUserType, userProfileApi } from "src/api/profileApi"
import { UserPhotosType } from "src/api/usersApi"
import { switchLoaderAC } from "../users/usersReducer"
import { AppThunk } from "src/state/store"
import { handleServerNetworkError } from "src/utils/error-utils"
import { setStatusAppAC } from "../app-reducer/appReducer"

export type SetProfileUser = ReturnType<typeof setProfileUserAC>
export type SetProfileUserStatus = ReturnType<typeof setProfileUserStatusAC>

type UserActionsType = SetProfileUser | SetProfileUserStatus

export type ExtendedInitialStateType = ResponseProfileUserType & { status: string }

export const initialState: ExtendedInitialStateType = {
  userId: 0,
  lookingForAJob: false,
  lookingForAJobDescription: "",
  fullName: "",
  contacts: {} as ProfileUserContactsType,
  photos: {} as UserPhotosType,
  status: ""
};

export const userProfileReducer = (state: ExtendedInitialStateType = initialState, action: UserActionsType): ExtendedInitialStateType => {
  switch (action.type) {
    case "GET-PROFILE-USER-STATUS":
      return { ...state, status: action.status }
    case "SET-PROFILE-USER":
      return { ...state, ...action.response }
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

export const setProfileUserStatusAC = (status: string) => {
  return {
    type: 'GET-PROFILE-USER-STATUS', status

  } as const
}


//thunk
export const getProfileUserTC = (userId: number, isLoader: boolean = false): AppThunk =>
  async dispatch => {
    dispatch(switchLoaderAC(!isLoader))
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await userProfileApi.getProfileUser(userId)
      dispatch(setProfileUserAC(res.data))
      dispatch(getProfileUserStatusTC(userId))
      dispatch(setStatusAppAC("succeeded"))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
    dispatch(switchLoaderAC(isLoader))
  }


export const getProfileUserStatusTC = (userId: number, isLoader: boolean = false): AppThunk =>
  async dispatch => {
    dispatch(switchLoaderAC(!isLoader))
    dispatch(setStatusAppAC("loading"))
    try {
      const res = await userProfileApi.getProfileUserStatus(userId)
      dispatch(setProfileUserStatusAC(res.data))
      dispatch(setStatusAppAC("succeeded"))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
    dispatch(switchLoaderAC(isLoader))
  }