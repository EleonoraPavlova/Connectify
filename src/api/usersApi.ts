import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'df372eaa-0071-4b5c-8575-6663c6218407',
  },
})

export type UserApiType = {
  id: number
  name: string
  status: string
  photos: UserPhotosType
  followed: boolean
  followingInProgress: UserStatuses
  likeCounter: number
}

export type UserStatuses = 'idle' | 'loading' | 'succeeded' | 'failed'

export type UserPhotosType = {
  small: string
  large: string
}

export type ResponseUsersType = {
  items: UserApiType[]
  totalCount: number
  error: string
}

export const usersApi = {
  getUsers(count: number, page: number, friend: boolean) {
    //count - page size
    const queryParams = {
      friend,
      count,
      page,
    }

    return instance.get<ResponseUsersType>(`users`, { params: queryParams })
  },
}
