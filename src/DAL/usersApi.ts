import { instance } from './instance'
import { ResponseUsers } from 'common/types'

export const usersApi = {
  getUsers(count: number, page: number, friend: boolean) {
    //count - page size
    const queryParams = {
      friend,
      count,
      page,
    }

    return instance.get<ResponseUsers>(`users`, { params: queryParams })
  },
}
