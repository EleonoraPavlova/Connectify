import { ResponseFollow, ResponseProfileUser } from 'common/types'
import { instance } from './instance'

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
