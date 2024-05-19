import { instance } from './instance'

export const captchaApi = {
  getCaptcha() {
    return instance.get<{ url: string }>('security/get-captcha-url')
  },
}
