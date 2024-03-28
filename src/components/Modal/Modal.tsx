import React, { memo } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { SocialContactsMap } from 'components/SocialContactsMap'
import { UserFoto } from 'components/UsersComponents/UserFoto'
import { selectUserProfile } from 'BLL/reducers/userProfileSlice'

type ModalProps = {
  activeModal: boolean
  setActiveModal: (arg: boolean) => void
  setSearchParams: () => void
}

export const Modal: React.FC<ModalProps> = memo(({ activeModal, setActiveModal, setSearchParams }) => {
  const profileUser = useSelector(selectUserProfile)
  const mocPhoto = 'https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg'
  const navigate = useNavigate()
  let profileUserUpper =
    profileUser && profileUser.fullName ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1) : ''

  const closeModal = () => {
    setActiveModal(false)
    setSearchParams() //clean query params
    navigate('/findUsers')
  }

  return (
    <Box className={activeModal ? 'modal activeModal' : 'modal'} onClick={closeModal}>
      <Box
        className={activeModal ? 'modal__content modal__content-active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}>
        <Box className="modal__box">
          <Box className="modal__avatar">
            <UserFoto
              link={profileUser.photos.large ? profileUser.photos.large : mocPhoto}
              additionalClass="modal__image"
            />
          </Box>
          <Box className="modal__mainInfo">
            <List className="modal__data">
              <ListItem className="modal__data-name">
                {' '}
                <Typography sx={{ fontWeigth: 'bold' }}> {profileUserUpper}</Typography>{' '}
              </ListItem>
              <ListItem>
                <Typography>
                  {' '}
                  <span className="modal__data-span"> Id: </span> {profileUser.userId}{' '}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  {' '}
                  <span className="modal__data-span"> Looking for a job: </span> {profileUser.lookingForAJob}{' '}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  {' '}
                  <span className="modal__data-span">Description: </span> {profileUser.lookingForAJobDescription}{' '}
                </Typography>
              </ListItem>
              <ListItem className="modal__data-status">
                <Typography>
                  {' '}
                  <span className="modal__data-span">Status: </span>
                  {profileUser.status}{' '}
                </Typography>
              </ListItem>
            </List>
            <List className="modal__contact">{<SocialContactsMap />}</List>
          </Box>
        </Box>
      </Box>
    </Box>
  )
})
