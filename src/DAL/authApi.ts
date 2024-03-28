import { LoginParams, ResponseFollow } from 'common/types'
import { instance } from './instance'

export const authApi = {
  login(params: LoginParams) {
    return instance.post<ResponseFollow<{ userId: number }>>('/auth/login', params)
  },

  authMe() {
    //проверочный запрос на cookie при инициализации app
    return instance.get<ResponseFollow<{ id: number; email: string; login: string }>>('/auth/me')
  },

  logOut() {
    return instance.delete<ResponseFollow>('/auth/login')
  },
}
