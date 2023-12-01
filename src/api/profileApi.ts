import { UserPhotosType, instanse } from "./usersApi"


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


export const profileApi = {
  getProfileUser(userId: number) {
    return instanse.get<ResponseProfileUserType>(`/profile/${userId}`)
  }
}