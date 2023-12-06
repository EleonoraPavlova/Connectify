import React from 'react';
import './index.scss';
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
import { UserContacts } from "../../common/UsersComponents/UserContacts/UserContacts";
import { UserTypeApi } from "src/api/usersApi";
import { useNavigate } from "react-router-dom";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";


type ModalProps = {
  activeModal: boolean
  setActiveModal: (arg: boolean) => void
  setSearchParams: () => void
}

type SocialContactsType = {
  [key: string]: string;
}

export const Modal: React.FC<ModalProps> = ({ activeModal, setActiveModal, setSearchParams }) => {
  const navigate = useNavigate();
  const usersResponse = useAppSelector<UserTypeApi[]>(state => state.usersPage.items)
  const profileUser = useAppSelector<ResponseProfileUserType>(state => state.userProfile)
  const contacts: SocialContactsType = profileUser.contacts as SocialContactsType;
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  let findStatus = usersResponse.find(u => u.id === profileUser.userId)

  const socialContacts: SocialContactsType[] = [
    { icon: facebookIcon, key: 'facebook' },
    { icon: githubIcon, key: 'github' },
    { icon: instaIcon, key: 'instagram' },
    { icon: vkIcon, key: 'vk' },
    { icon: youtubeIcon, key: 'youtube' },
    { icon: twitter, key: 'twitter' },
    { icon: website, key: 'website' },
    { icon: mainLink, key: 'link' }
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

  const closeModal = () => {
    setActiveModal(false)
    setSearchParams() //clean query params
    navigate('/findUsers');
  }

  return (
    <div className={activeModal ? "modal activeModal" : "modal"} onClick={closeModal}>
      <div className={activeModal ? "modal__content modal__content-active" : "modal__content"} onClick={e => e.stopPropagation()}>
        <div className="modal__box">
          <div className="modal__avatar">
            <UserFoto link={profileUser.photos.large ? profileUser.photos.large : mocPhoto} additionalClass="modal__image" />
          </div>
          <div className="modal__mainInfo">
            <ul className="modal__data">
              <li className="modal__data-name"> {profileUser.fullName}</li>
              <li>Id: {profileUser.userId}</li>
              <li>Looking for a job: {profileUser.lookingForAJob}</li>
              <li>Description: {profileUser.lookingForAJobDescription}</li>
              <li className="modal__data-status">Status: {findStatus?.status}</li>
            </ul>
            <ul className="modal__contact">
              {socialContactsMap()}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}