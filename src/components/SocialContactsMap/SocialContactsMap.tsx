import React from 'react'
import { useSelector } from 'react-redux'
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
import { List } from '@mui/material'
import s from './index.module.scss'

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
    <List className={s.social__list}>
      {socialContacts.map((contact) => {
        const contactValue = contacts[contact.key]
        if (contactValue !== undefined) {
          return (
            <UserContacts key={contact.key} icon={contact.icon} href={`https://${contact.key}.com/${contactValue}`} />
          )
        }
        return null
      })}
    </List>
  )
}
