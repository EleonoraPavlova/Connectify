import { instance } from "./usersApi"


export type ResponseFollowType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}

export const followApi = {
  getFollower(userId: number) {
    //Is current user follower for requested user
    return instance.get<boolean>(`/follow/${userId}`)
  },

  followTo(userId: number) {  //Follow requested user
    return instance.post<ResponseFollowType>(`/follow/${userId}`)
  },

  unFollowTo(userId: number) {
    return instance.delete<ResponseFollowType>(`/follow/${userId}`)
  }
}