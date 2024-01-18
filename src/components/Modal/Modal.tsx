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
import { UserApiType } from "src/api/usersApi";
import { useNavigate } from "react-router-dom";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";


type ModalProps = {
  activeModal: boolean
  setActiveModal: (arg: boolean) => void
  setSearchParams: () => void
}

export const Modal: React.FC<ModalProps> = ({ activeModal, setActiveModal, setSearchParams }) => {
  const navigate = useNavigate();
  const usersResponse = useAppSelector<UserApiType[]>(state => state.usersPage.items)
  const profileUser = useAppSelector<ResponseProfileUserType>(state => state.userProfile)
  let profileUserUpper = profileUser && profileUser.fullName
    ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1)
    : '';
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"

  let findStatus = usersResponse.find(u => u.id === profileUser.userId)

  const closeModal = () => {
    setActiveModal(false)
    setSearchParams() //clean query params
    navigate('/findUsers');
  }

  return (
    <Box className={activeModal ? "modal activeModal" : "modal"} onClick={closeModal}>
      <Box className={activeModal ? "modal__content modal__content-active" : "modal__content"} onClick={e => e.stopPropagation()}>
        <Box className="modal__box">
          <Box className="modal__avatar">
            <UserFoto link={profileUser.photos.large ? profileUser.photos.large : mocPhoto} additionalClass="modal__image" />
          </Box>
          <Box className="modal__mainInfo">
            <List className="modal__data">
              <ListItem className="modal__data-name"><Typography sx={{ fontWeigth: "bold" }}> {profileUserUpper}</Typography> </ListItem>
              <ListItem><Typography > Id: {profileUser.userId} </Typography></ListItem>
              <ListItem><Typography > Looking for a job: {profileUser.lookingForAJob}</Typography></ListItem>
              <ListItem><Typography > Description: {profileUser.lookingForAJobDescription}</Typography></ListItem>
              <ListItem className="modal__data-status"><Typography >Status: {findStatus?.status}</Typography></ListItem>
            </List>
            <List className="modal__contact">
              {<SocialContactsMap />}
            </List>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}