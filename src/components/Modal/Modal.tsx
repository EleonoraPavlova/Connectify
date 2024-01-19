import React, { useEffect } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { useNavigate } from "react-router-dom";
import { UserFoto } from "src/common/UsersComponents/UserFoto/UserFoto";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { SocialContactsMap } from "src/common/SocialContactsMap/SocialContactsMap";
import { ExtendedInitialStateType, getProfileUserStatusTC } from "src/state/reducers/userProfile/userProfileReducer";


type ModalProps = {
  activeModal: boolean
  setActiveModal: (arg: boolean) => void
  setSearchParams: () => void
}

export const Modal: React.FC<ModalProps> = ({ activeModal, setActiveModal, setSearchParams }) => {
  const profileUser = useAppSelector<ExtendedInitialStateType>(state => state.userProfile)
  const mocPhoto = "https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg"
  const navigate = useNavigate();
  let profileUserUpper = profileUser && profileUser.fullName
    ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1)
    : '';

  // const dispatch = useAppDispatch()

  // // useEffect(() => {
  // //   dispatch(getProfileUserStatusTC(profileUser.userId))
  // // }, [dispatch])

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
              <ListItem className="modal__data-status"><Typography >Status: {profileUser.status}</Typography></ListItem>
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