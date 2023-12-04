import React from 'react';
import './index.scss';
import { UserFoto } from "src/common/UserFoto/UserFoto";
import { ResponseProfileUserType } from "src/api/profileApi";
import { useAppSelector } from "src/state/hooks/hooks-selectors";
import instaIcon from '../../assets/icons/insta.png'
import facebookIcon from '../../assets/icons/facebook.png'
import githubIcon from '../../assets/icons/github.png'
import youtubeIcon from '../../assets/icons/youtube.png'
import vkIcon from '../../assets/icons/vk.png'
import mainLink from '../../assets/icons/link.png'
import twitter from '../../assets/icons/twitter.png'
import website from '../../assets/icons/website.png'
import { UserContacts } from "../UserContacts/UserContacts";


type ModalProps = {
  activeModal: boolean
  setActiveModal: () => void
}

type SocialContactsType = {
  [key: string]: string;
}


export const Modal: React.FC<ModalProps> = ({ activeModal, setActiveModal }) => {
  const profileUser = useAppSelector<ResponseProfileUserType>(state => state.userProfile)
  const contacts: SocialContactsType = profileUser.contacts as SocialContactsType;
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  const socialContacts: SocialContactsType[] = [
    { icon: facebookIcon, key: 'facebook' },
    { icon: githubIcon, key: 'github' },
    { icon: instaIcon, key: 'instagram' },
    { icon: vkIcon, key: 'vk' },
    { icon: mainLink, key: 'link' },
    { icon: youtubeIcon, key: 'youtube' },
    { icon: twitter, key: 'twitter' },
    { icon: website, key: 'website' },
  ];

  const socialContactsMap = () => {
    return socialContacts.map((contact) => {
      const contactValue = contacts[contact.key];
      if (contactValue !== undefined) {
        return (
          <UserContacts
            key={contact.key}
            icon={contact.icon}
            href={`https://${contact.key}.com/${contactValue}`}
          />
        );
      }
      return null;
    });
  };


  return (<div className="modal">
    <div className="modal__box">
      <div className="modal__avatar">
        <UserFoto link={profileUser.photos.large ? profileUser.photos.large : mocPhoto} additionalClass="modal__image" />
      </div>
      <div className="modal__mainInfo">
        <ul className="modal__data">
          <li className="modal__data-name"> {profileUser.fullName}</li>
          <li>UserId: {profileUser.userId}</li>
          <li>Looking for a job: {profileUser.lookingForAJob}</li>
          <li>Description: {profileUser.lookingForAJobDescription}</li>
        </ul>
        <ul className="modal__contact">
          {socialContactsMap()}
        </ul>
      </div>
    </div>
  </div >)
}