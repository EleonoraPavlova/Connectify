import { ResponseFollow } from 'common/types'
import { instance } from './instance'

export const followApi = {
  getFollower(userId: number) {
    //Is current user follower for requested user
    return instance.get<boolean>(`/follow/${userId}`)
  },

  followTo(userId: number) {
    //Follow requested user
    return instance.post<ResponseFollow>(`/follow/${userId}`)
  },

  unFollowTo(userId: number) {
    return instance.delete<ResponseFollow>(`/follow/${userId}`)
  },
}
