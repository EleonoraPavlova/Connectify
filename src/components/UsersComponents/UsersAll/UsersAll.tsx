import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './index.scss'
import Box from '@mui/material/Box'
import { PaginationsCustom } from 'components/PaginationsCustom'
import { UserApi } from 'common/types'
import { Loader } from 'components/Loader'
import { UsersMap } from '../UsersMap'
import { selectUsersIsLoader, selectUsersItems } from 'BLL/reducers/usersSlice'
import { Modal } from 'components/Modal'

type UsersProps = {
  pagesCount: number
  currentPage: number
  setCurrentPageHandle: (page: number) => void
  btnText: string
}

export const UsersAll: React.FC<UsersProps> = ({ pagesCount, currentPage, setCurrentPageHandle, btnText }) => {
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const idFromSearchParams = searchParams.get('id')

  console.log('idFromSearchParams', idFromSearchParams)

  const isLoader = useSelector(selectUsersIsLoader)
  const usersResponse = useSelector(selectUsersItems)

  const usersMap = usersResponse.map((u: UserApi) => {
    return <UsersMap btnText={btnText} key={u.id} user={u} />
  })

  // debugger
  return (
    <>
      <Box className="usersAll">
        {isLoader && <Loader />}
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
        idFromSearchParams={idFromSearchParams}
        activeModal={!!searchParams.get('id')}
        setActiveModal={setActiveModal}
        setSearchParams={setSearchParams}
      />
    </>
  )
}
