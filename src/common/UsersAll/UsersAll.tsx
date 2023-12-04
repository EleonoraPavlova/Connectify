import React, { useEffect, useState } from 'react';
import './index.scss';
import { setResponseTC, toggleFollowUserTC, unFollowUserTC } from 'src/state/reducers/users/usersReducer';
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks-selectors';
import { UserTypeApi } from 'src/api/usersApi';
import { User } from 'src/pages/FindUsers/User/User';
import { PaginationsCustom } from '../PaginationsCustom/PaginationsCustom';
import { Loader } from "../Loader/Loader";
import { getProfileUserTC } from "src/state/reducers/userProfile/userProfileReducer";
import { Modal } from "src/components/Modal/Modal";

export type UsersType = {
  friend: boolean
  btnTexInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTexInfo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeModal, setActiveModal] = useState(false)
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
    }

    const sendMessage = () => {
      alert("Will send")
    }
    console.log("btnTexInfo", btnTexInfo)
    return (
      <User key={u.id} user={u}
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
        <Modal activeModal={activeModal} setActiveModal={setActiveModal} />
      </>
    }
  </>
  )
}