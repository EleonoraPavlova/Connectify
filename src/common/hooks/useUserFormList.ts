import { ExtendedInitialResponseProfileUser, SocialContacts } from 'common/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

export function useUserFormList(
  profileUserState: ExtendedInitialResponseProfileUser,
  setProfileUserState: Dispatch<SetStateAction<ExtendedInitialResponseProfileUser>>
) {
  const [errorLocal, setErrorLocal] = useState<{
    [key: string]: string | undefined
  }>({})

  let profileUserUpperFullName =
    profileUserState && profileUserState.fullName
      ? profileUserState.fullName[0].toUpperCase() + profileUserState.fullName.slice(1)
      : ''

  const collectionOfForm = (key: string, title: string) => {
    if (title.length >= 300) {
      setErrorLocal((prev) => ({ ...prev, [key]: 'More than 300 symbols' }))
    } else {
      setErrorLocal((prev) => ({ ...prev, [key]: undefined }))
      setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
        ...prevState,
        [key]: title,
      }))
    }
  }

  const collectionOfFormSocial = (params: SocialContacts) => {
    setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
      ...prevState,
      contacts: {
        ...prevState.contacts,
        ...params,
      },
    }))
  }

  const collectionOfFormCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
      ...prevState,
      lookingForAJob: e.currentTarget.checked,
    }))
  }

  const formItems = [
    {
      label: 'Name',
      prop: 'fullName',
      title: profileUserUpperFullName,
    },
    {
      label: 'Status',
      prop: 'status',
      title: profileUserState.status,
    },
    {
      label: 'About me',
      prop: 'aboutMe',
      title: profileUserState.aboutMe,
    },
    {
      label: 'Skills',
      prop: 'lookingForAJobDescription',
      title: profileUserState.lookingForAJobDescription,
    },
  ]

  return {
    errorLocal,
    formItems,
    collectionOfForm,
    collectionOfFormCheckbox,
    collectionOfFormSocial,
  }
}
