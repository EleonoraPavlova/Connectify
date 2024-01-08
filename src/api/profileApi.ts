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
  }
}