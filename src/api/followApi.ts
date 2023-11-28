import { instanse } from "./usersApi"


export type ResponseFollowType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}

export const followApi = {
  getFollower(userId: number) {
    //Is current user follower for requested user
    return instanse.get<boolean>(`/follow/${userId}`)
  },

  followTo(userId: number) {  //Follow requested user
    return instanse.post<ResponseType>(`/follow/${userId}`)
  },

  unFollowTo(userId: number) {
    return instanse.delete<ResponseType>(`/follow/${userId}`)
  }
}