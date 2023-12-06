import React, { useEffect, useState } from 'react';
import './index.scss';
import { setResponseTC, toggleFollowUserTC, unFollowUserTC } from 'src/state/reducers/users/usersReducer';
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks-selectors';
import { UserTypeApi } from 'src/api/usersApi';
import { UserItem } from 'src/pages/FindUsers/UserItem/UserItem';
import { PaginationsCustom } from '../PaginationsCustom/PaginationsCustom';
import { Loader } from "../Loader/Loader";
import { getProfileUserTC } from "src/state/reducers/userProfile/userProfileReducer";
import { Modal } from "src/components/Modal/Modal";
import { useSearchParams } from "react-router-dom";

export type UsersType = {
  friend: boolean
  btnTexInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTexInfo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const usersResponse = useAppSelector<UserTypeApi[]>(state => state.usersPage.items)
  const totalCount = useAppSelector<number>(state => state.usersPage.totalCount);
  const isLoader = useAppSelector<boolean>(state => state.usersPage.isLoader);
  const pageSize = 15
  const pagesCount = Math.ceil(totalCount / pageSize)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setResponseTC(pageSize, currentPage, friend));
  }, [dispatch, currentPage, friend])


  const usersMap = usersResponse.map((u: UserTypeApi) => {
    const toggleFollowUser = () => {
      if (!u.followed) {
        dispatch(toggleFollowUserTC(u.id, u.followed));
      } else if (u.followed) {
        dispatch(unFollowUserTC(u.id, u.followed))
      }
    }

    const viewFullProfile = () => {
      dispatch(getProfileUserTC(u.id))
      setActiveModal(true)
      setSearchParams({ id: `${u.id}` })
    }

    const sendMessage = () => {
      alert("Will send")
    }

    return (
      <UserItem key={u.id} user={u}
        toggleFollowUser={toggleFollowUser}
        btnTextToggle={u.followed ? "Unfollowed" : "Follow"}
        callBack={() => btnTexInfo === "Message" ? sendMessage() : viewFullProfile()}
        btnTexInfo={btnTexInfo}
      />
    );
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