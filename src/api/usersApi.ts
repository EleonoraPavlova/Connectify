import axios from "axios"

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  ...settings
})


export type UserTypeApi = {
  id: number
  name: string
  status: string
  photos: UserPhotosType
  followed: boolean
}

export type UserPhotosType = {
  small: string
  large: string
}

export type ResponseUsersType = {
  items: UserTypeApi[]
  totalCount: number
  error: string
}


export const usersApi = {
  getUsers(count: number, page: number, friend: boolean) {

    const queryParams = {
      friend,
      count,
      page
    };

    return instanse.get<ResponseUsersType>(`users`, { params: queryParams })
  }
}