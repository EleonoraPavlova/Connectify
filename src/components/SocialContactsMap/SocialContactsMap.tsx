import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './index.module.scss'
import instaIcon from './icons/insta.png'
import facebookIcon from './icons/facebook.png'
import githubIcon from './icons/github.png'
import vkIcon from './icons/vk.png'
import youtubeIcon from './icons/youtube.png'
import twitter from './icons/twitter.png'
import website from './icons/website.png'
import mainLink from './icons/link.png'
import { SocialContacts } from 'common/types'
import { selectUserProfile } from 'BLL/reducers/userProfileSlice'
import { UserContacts } from 'components/UsersComponents/UserContacts'
import { Box, List } from '@mui/material'
import { EditableSpan } from 'components/EditableSpan'
import { isValidUrl } from 'common/utils/isValidUrl'

type Props = {
  additionalClass?: string
  editMode: boolean
  saveForm?: () => void | undefined
  setEditMode?: (arg: boolean) => void | undefined
  collectionOfFormSocial?: (arg: SocialContacts) => void | undefined
}

export const SocialContactsMap = ({
  additionalClass,
  editMode,
  saveForm,
  setEditMode,
  collectionOfFormSocial = undefined,
}: Props) => {
  const profileUser = useSelector(selectUserProfile)
  let [errorLocal, setErrorLocal] = useState<Partial<SocialContacts>>({})

  const socialContacts: { icon: string; key: keyof SocialContacts; link: string }[] = [
    { icon: facebookIcon, key: 'facebook', link: 'https://www.facebook.com/' },
    { icon: githubIcon, key: 'github', link: 'https://github.com/' },
    { icon: instaIcon, key: 'instagram', link: 'https://www.instagram.com/' },
    { icon: vkIcon, key: 'vk', link: 'https://vk.com/' },
    { icon: youtubeIcon, key: 'youtube', link: 'https://www.youtube.com/' },
    { icon: twitter, key: 'twitter', link: 'https://twitter.com/' },
    { icon: website, key: 'website', link: 'https://www.asos.com/' },
    { icon: mainLink, key: 'mainLink', link: 'https://fontawesome.com/' },
  ]

  const changeSocialHandle = (key: keyof SocialContacts, newValue: string) => {
    if (isValidUrl(newValue)) {
      setErrorLocal((prev) => ({ ...prev, [key]: undefined }))
      if (collectionOfFormSocial) {
        collectionOfFormSocial({ [key]: newValue })
      }
    } else {
      setErrorLocal((prev) => ({ ...prev, [key]: 'invalid field' }))
    }
  }

  const iconsMap = () => {
    return socialContacts.map(({ icon, key, link }) => (
      <Box className={s.social__box} key={key}>
        <UserContacts icon={icon} href={link} />
        {editMode && (
          <EditableSpan
            error={!!errorLocal[key]}
            helperText={errorLocal[key] ? errorLocal[key] : undefined}
            title={profileUser.contacts[key as keyof typeof profileUser.contacts] || ''}
            editMode={editMode}
            saveForm={saveForm ? saveForm : undefined}
            setEditMode={setEditMode ? setEditMode : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeSocialHandle(key, e.currentTarget.value)}
          />
        )}
      </Box>
    ))
  }

  return <List className={`${s.social__list} ${additionalClass || ''}`}>{iconsMap()}</List>
}
