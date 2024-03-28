import React, { useState } from 'react'
import './index.scss'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { selectUsersIsLoader, selectUsersItems } from 'state/reducers/usersSlice/usersSlice'
import { useSelector } from 'react-redux'
import { PaginationsCustom } from 'components/PaginationsCustom'
import { UserApi } from 'common/types'
import { Loader } from 'components/Loader'
import { Modal } from 'components/Modal'
import { UsersMap } from '../UsersMap'

type UsersProps = {
  pagesCount: number
  currentPage: number
  setCurrentPageHandle: (page: number) => void
  btnText: string
}

export const UsersAll: React.FC<UsersProps> = ({ pagesCount, currentPage, setCurrentPageHandle, btnText }) => {
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const isLoader = useSelector(selectUsersIsLoader)
  const usersResponse = useSelector(selectUsersItems)

  const usersMap = usersResponse.map((u: UserApi) => {
    return <UsersMap btnText={btnText} key={u.id} user={u} />
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
