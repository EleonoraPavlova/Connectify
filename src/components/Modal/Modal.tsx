import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { SocialContactsMap } from 'components/SocialContactsMap'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { UserFoto } from 'components/UsersComponents/UserFoto'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { replaceRussianLetters } from 'common/utils/translator'
import { useActions } from 'common/hooks/useActions'
import { selectAppError } from 'BLL/reducers/appSlice'

type Props = {
  idFromSearchParams: string | null
  activeModal: boolean
  setActiveModal: (arg: boolean) => void
  setSearchParams: () => void
}

export const Modal: React.FC<Props> = memo(({ activeModal, idFromSearchParams, setActiveModal, setSearchParams }) => {
  let profileUser = useSelector(selectUserProfile)
  let error = useSelector(selectAppError)
  const navigate = useNavigate()
  const { getProfileUserTC } = useActions(userThunks)

  let upperName = profileUser?.fullName ? profileUser.fullName[0].toUpperCase() + profileUser.fullName.slice(1) : ''

  useEffect(() => {
    if (idFromSearchParams) {
      getProfileUserTC({ userId: Number(idFromSearchParams) })
    }
  }, [])

  const closeModal = () => {
    setActiveModal(false)
    setSearchParams() //clean query params
    navigate('/findUsers')
    idFromSearchParams = null
  }

  return (
    <Box className={activeModal ? 'modal activeModal' : 'modal'} onClick={closeModal}>
      <Box
        className={activeModal ? 'modal__content modal__content-active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}>
        <Box className="modal__box">
          {error ? (
            <Box sx={{ margin: '0 auto', color: 'red', fontWeight: 'bold', padding: '40px' }}>{error}</Box>
          ) : (
            <>
              <Box className="modal__avatar">
                <UserFoto link={profileUser.photos.large} additionalClass="modal__image" />
              </Box>
              <Box className="modal__mainInfo">
                <List className="modal__data">
                  <ListItem className="modal__data-name">
                    <Typography sx={{ fontWeight: 'bold' }}>{replaceRussianLetters(upperName)}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <span className="modal__data-span"> Id: </span> {profileUser.userId}
                    </Typography>
                  </ListItem>
                  <ListItem className="modal__data-status">
                    <Typography>
                      <span className="modal__data-span">Status: </span>
                      {replaceRussianLetters(profileUser.status)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <span className="modal__data-span"> Skills: </span>{' '}
                      {replaceRussianLetters(profileUser.lookingForAJobDescription)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <span className="modal__data-span"> Job Seeker: </span> {profileUser.lookingForAJob}
                    </Typography>
                  </ListItem>
                </List>
                <SocialContactsMap editMode={false} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
})
