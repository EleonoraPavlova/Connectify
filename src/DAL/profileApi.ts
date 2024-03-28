import { ResponseFollow } from 'common/types'
import { UserPhotos, instance } from './usersApi'

export type ProfileUserContacts = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ResponseProfileUser = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ProfileUserContacts
  photos: UserPhotos
  aboutMe: string
}

export const userProfileApi = {
  getProfileUser(userId: number) {
    return instance.get<ResponseProfileUser>(`/profile/${userId}`)
  },

  getProfileUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`)
  },

  updateProfileUser(params: ResponseProfileUser) {
    return instance.put<ResponseFollow>('/profile', params)
  },

  updateProfileUserStatus(status: string) {
    return instance.put<ResponseFollow>('/profile/status', { status })
  },
}
