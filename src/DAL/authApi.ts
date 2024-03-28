import { ResponseFollow } from './followApi'
import { instance } from './usersApi'

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

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
