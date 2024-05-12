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

  updateProfileUserPhoto(photos: UserPhotos) {
    const formData = new FormData()
    if (photos.large) {
      formData.append('image', photos.large)
    }

    return instance.put<ResponseFollow<UserPhotos>>('/profile/photo', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
  },
}

// if (photos.small) {
//   const smallPhotoBlob = await fetch(photos.small).then((res) => res.blob())
//   formData.append('image', smallPhotoBlob, 'small_photo.jpg')
// }
// if (photos.large) {
//   const largePhotoBlob = await fetch(photos.large).then((res) => res.blob())
//   formData.append('image', largePhotoBlob, 'large_photo.jpg')
// }
