export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type ResponseFollow<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}
