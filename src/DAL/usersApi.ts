import { instance } from './instance'
import { QueryParamsGetUsers, ResponseUsers } from 'common/types'

export const usersApi = {
  getUsers(params: QueryParamsGetUsers) {
    return instance.get<ResponseUsers>(`users`, { params })
  },
}
