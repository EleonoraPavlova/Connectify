import React, { useState } from 'react'
import './index.scss'
import { PaginationsCustom } from '../../PaginationsCustom/PaginationsCustom'
import { Loader } from '../../Loader/Loader'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { UserApi } from 'api/usersApi'
import { selectUsersIsLoader, selectUsersItems } from 'state/reducers/usersSlice/usersSlice'
import { UsersMap } from '../UsersMap/UsersMap'
import { Modal } from 'components/Modal/Modal'
import { useSelector } from 'react-redux'

export type UsersType = {
  pagesCount: number
  currentPage: number
  setCurrentPageHandle: (page: number) => void
  btnTextInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ pagesCount, currentPage, setCurrentPageHandle, btnTextInfo }) => {
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const isLoader = useSelector(selectUsersIsLoader)
  const usersResponse = useSelector(selectUsersItems)

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
                <PaginationsCustom
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPageHandle}
                />
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
