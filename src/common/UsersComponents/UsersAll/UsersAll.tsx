import React, { useEffect, useState } from 'react'
import './index.scss'
import { PaginationsCustom } from '../../PaginationsCustom/PaginationsCustom'
import { Loader } from '../../Loader/Loader'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useAppDispatch } from 'state/hooks/hooks-selectors'
import { UserApi } from 'api/usersApi'
import {
  selectUsersIsLoader,
  selectUsersItems,
  selectUsersTotalCount,
  setResponseTC,
} from 'state/reducers/usersSlice/usersSlice'
import { UsersMap } from '../UsersMap/UsersMap'
import { Modal } from 'components/Modal/Modal'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'

export type UsersType = {
  friend: boolean
  btnTextInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTextInfo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const isLoader = useSelector(selectUsersIsLoader)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const usersResponse = useSelector(selectUsersItems)
  const totalCount = useSelector(selectUsersTotalCount)
  const pageSize = 15
  const pagesCount = Math.ceil(totalCount / pageSize)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn) dispatch(setResponseTC({ pageSize, currentPage, friend }))
  }, [dispatch, currentPage, friend, isLoggedIn])

  const usersMap = usersResponse.map((u: UserApi) => {
    return <UsersMap btnTextInfo={btnTextInfo} key={u.id} user={u} />
  })

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <Box className="usersAll">
            <Box>
              <Box className="usersAll__list">{usersMap}</Box>
              <Box className="usersAll__wrap-button">
                <PaginationsCustom pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </Box>
            </Box>
          </Box>
          <Modal
            activeModal={!!searchParams.get('id')}
            setActiveModal={setActiveModal}
            setSearchParams={setSearchParams}
          />
        </>
      )}
    </>
  )
}
