import { ResponseFollowType } from './followApi'
import { instance } from './usersApi'

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export const authApi = {
  login(params: LoginParamsType) {
    return instance.post<ResponseFollowType<{ userId: number }>>('/auth/login', params)
  },

  authMe() {
    //проверочный запрос на cookie при инициализации app
    return instance.get<ResponseFollowType<{ id: number; email: string; login: string }>>('/auth/me')
  },

  logOut() {
    return instance.delete<ResponseFollowType>('/auth/login')
  },
}
