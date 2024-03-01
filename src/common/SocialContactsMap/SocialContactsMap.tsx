import React from 'react'
import instaIcon from '../../assets/icons/insta.png'
import facebookIcon from '../../assets/icons/facebook.png'
import githubIcon from '../../assets/icons/github.png'
import youtubeIcon from '../../assets/icons/youtube.png'
import vkIcon from '../../assets/icons/vk.png'
import mainLink from '../../assets/icons/link.png'
import twitter from '../../assets/icons/twitter.png'
import website from '../../assets/icons/website.png'
import { UserContacts } from '../../common/UsersComponents/UserContacts/UserContacts'
import { ResponseProfileUserType } from 'api/profileApi'
import { useAppSelector } from 'state/hooks/hooks-selectors'

export type SocialContactsType = {
  [key: string]: string
}

export const SocialContactsMap = () => {
  const profileUser = useAppSelector<ResponseProfileUserType>((state) => state.userProfile)
  const contacts: SocialContactsType = profileUser.contacts as SocialContactsType

  const socialContacts: SocialContactsType[] = [
    { icon: facebookIcon, key: 'facebook' },
    { icon: githubIcon, key: 'github' },
    { icon: instaIcon, key: 'instagram' },
    { icon: vkIcon, key: 'vk' },
    { icon: youtubeIcon, key: 'youtube' },
    { icon: twitter, key: 'twitter' },
    { icon: website, key: 'website' },
    { icon: mainLink, key: 'link' },
  ]

  return (
    <>
      {socialContacts.map((contact) => {
        const contactValue = contacts[contact.key]
        if (contactValue !== undefined) {
          return (
            <UserContacts key={contact.key} icon={contact.icon} href={`https://${contact.key}.com/${contactValue}`} />
          )
        }
        return null
      })}
    </>
  )
}
