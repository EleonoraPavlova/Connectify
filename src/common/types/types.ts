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

export type ResponseUsers = {
  items: UserApi[]
  totalCount: number
  error: string
}

export type ExtendedInitialResponseProfileUser = ResponseProfileUser & {
  status: string
  aboutMe: string | null
}

//profile
export type ProfileUserContacts = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ResponseProfileUser = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ProfileUserContacts
  photos: UserPhotos
  aboutMe: string
}

//user
export type UserPhotos = {
  small: string
  large: string
}

export type UserApi = {
  id: number
  name: string
  status: string
  photos: UserPhotos
  followed: boolean
  followingInProgress: UserStatuses
  likeCounter: number
}

export type ParamsProfileUser = {
  userId: number
  isLoader?: boolean
}

//social
export type SocialContacts = {
  [key: string]: string
}

export type UserStatuses = 'idle' | 'loading' | 'succeeded' | 'failed'
