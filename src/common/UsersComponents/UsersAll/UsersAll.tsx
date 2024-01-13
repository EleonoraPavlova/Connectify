import React, { useEffect, useState } from 'react';
import './index.scss';
import { setResponseTC } from 'src/state/reducers/users/usersReducer';
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks-selectors';
import { UserApiType } from 'src/api/usersApi';
import { PaginationsCustom } from '../../PaginationsCustom/PaginationsCustom';
import { Loader } from "../../Loader/Loader";
import { Modal } from "src/components/Modal/Modal";
import { useSearchParams } from "react-router-dom";
import { UsersMap } from "src/common/UsersComponents/UsersMap/UsersMap";

export type UsersType = {
  friend: boolean
  btnTextInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTextInfo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const usersResponse = useAppSelector<UserApiType[]>(state => state.usersPage.items)
  const totalCount = useAppSelector<number>(state => state.usersPage.totalCount);
  const isLoader = useAppSelector<boolean>(state => state.usersPage.isLoader);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const pageSize = 15
  const pagesCount = Math.ceil(totalCount / pageSize)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setResponseTC(pageSize, currentPage, friend));
    }
  }, [dispatch, currentPage, friend, isLoggedIn])


  const usersMap = usersResponse.map((u: UserApiType) => {
    return <UsersMap btnTextInfo={btnTextInfo} key={u.id} user={u} />
  });

  return (<>
    {isLoader ? <Loader /> :
      <>
        <div className="usersAll">
          <div>
            <div className="usersAll__list">{usersMap}</div>
            <div className="usersAll__wrap-button">
              <PaginationsCustom currentPage={currentPage} pagesCount={pagesCount} setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </div>
        <Modal activeModal={!!searchParams.get('id')}
          setActiveModal={setActiveModal}
          setSearchParams={setSearchParams} />
      </>
    }
  </>
  )
}