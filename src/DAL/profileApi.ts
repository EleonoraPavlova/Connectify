import { ResponseFollow, ResponseProfileUser, UserPhotos } from 'common/types'
import { instance } from './instance'

export const userProfileApi = {
  getProfileUser(userId: number) {
    return instance.get<ResponseProfileUser>(`/profile/${userId}`)
  },

  getProfileUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`)
  },

  updateProfileUser(params: ResponseProfileUser) {
    return instance.put<ResponseFollow>('/profile', params)
  },

  updateProfileUserStatus(status: string) {
    return instance.put<ResponseFollow>('/profile/status', { status })
  },

  updateProfileUserPhoto(image: UserPhotos) {
    const formData = new FormData()
    if (image.small) {
      formData.append('small', image.small)
    }

    if (image.large) {
      formData.append('large', image.large)
    }

    return instance.put<ResponseFollow<UserPhotos>>('/profile/photo', image, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
  },
}
