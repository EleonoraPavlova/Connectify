import { ExtendedInitialResponseProfileUser, SocialContacts } from 'common/types'
import { ChangeEvent } from 'react'

export function useUserFormList(
  profileUserState: ExtendedInitialResponseProfileUser,
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
) {
  let profileUserUpperFullName =
    profileUserState && profileUserState.fullName
      ? profileUserState.fullName[0].toUpperCase() + profileUserState.fullName.slice(1)
      : ''

  const collectionOfForm = (key: string, title: string) => {
    setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
      ...prevState,
      [key]: title,
    }))
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
    formItems,
    collectionOfForm,
    collectionOfFormCheckbox,
    collectionOfFormSocial,
  }
}
