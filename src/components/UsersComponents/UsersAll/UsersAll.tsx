import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

  const isLoader = useSelector(selectUsersIsLoader)
  const usersResponse = useSelector(selectUsersItems)

  const usersMap = usersResponse.map((u: UserApi) => {
    return <UsersMap btnText={btnText} key={u.id} user={u} />
  })

  return (
    <>
      <Box sx={{ padding: '20px' }}>
        {/* if found id in url */}
        {isLoader && !searchParams.get('id') ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Loader />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '60px' }}>{usersMap}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PaginationsCustom
                pagesCount={pagesCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPageHandle}
              />
            </Box>
          </Box>
        )}
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
