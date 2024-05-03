export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type ResponseFollow<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldsError[]
  data: Data
}

export type FieldsError = {
  field: string
  error: string
}

export type ResponseUsers = {
  error: string
  items: UserApi[]
  totalCount: number
}

export type ExtendedInitialResponseProfileUser = ResponseProfileUser & {
  status: string
  aboutMe: string | null
}

export type QueryParamsGetUsers = {
  count: number //count - page size
  page: number // currentPage
  friend?: boolean
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

//social
export type SocialContacts = Record<string, string>

export type UserStatuses = 'idle' | 'loading' | 'succeeded' | 'failed'
