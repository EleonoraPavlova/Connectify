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
import { useSelector } from 'react-redux'
import { selectUserProfile } from 'state/reducers/userProfileSlice/userProfileSlice'

export type SocialContacts = {
  [key: string]: string
}

export const SocialContactsMap = () => {
  const profileUser = useSelector(selectUserProfile)
  const contacts: SocialContacts = profileUser.contacts as SocialContacts

  const socialContacts: SocialContacts[] = [
    { icon: facebookIcon, key: 'facebook', link: 'https://www.facebook.com' },
    { icon: githubIcon, key: 'github', link: 'https://github.com' },
    { icon: instaIcon, key: 'instagram', link: 'https://www.instagram.com' },
    { icon: vkIcon, key: 'vk', link: 'https://vk.com' },
    { icon: youtubeIcon, key: 'youtube', link: 'https://www.youtube.com' },
    { icon: twitter, key: 'twitter', link: 'https://twitter.com' },
    { icon: website, key: 'website', link: 'https://www.asos.com/' },
    { icon: mainLink, key: 'link', link: 'https://fontawesome.com' },
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

// href={`https://${contact.key}.com/${contactValue}`}
