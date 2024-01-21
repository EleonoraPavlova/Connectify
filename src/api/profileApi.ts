import { ResponseFollowType } from "./followApi"
import { UserPhotosType, instance } from "./usersApi"


export type ProfileUserContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ResponseProfileUserType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ProfileUserContactsType
  photos: UserPhotosType
}


export const userProfileApi = {
  getProfileUser(userId: number) {
    return instance.get<ResponseProfileUserType>(`/profile/${userId}`)
  },

  getProfileUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`)
  },

  updateProfileUser(params: ResponseProfileUserType) {
    return instance.put<ResponseFollowType>('/profile', params)
  },

  updateProfileUserStatus(status: string) {
    return instance.put<ResponseFollowType>('/profile/status', { status })
  }
}