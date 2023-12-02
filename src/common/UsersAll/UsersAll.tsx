import React, { useEffect } from 'react';
import './index.scss';
import { getResponseTC, toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { ResponseUsersType, UserTypeApi } from "src/api/usersApi";
import { User } from "src/pages/FindUsers/User/User";
import { PaginationsCustom } from "../PaginationsCustom/PaginationsCustom";

export type UsersType = {
  friend: boolean
  btnTexInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTexInfo }) => {
  const usersResponse = useAppSelector<UserTypeApi[]>(state => state.usersPage.items)
  const currentPage = useAppSelector<number>(state => state.usersPage.currentPage);
  const pageSize = 15
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getResponseTC(pageSize, currentPage, friend))
  }, [dispatch, currentPage, friend])


  const usersMap = usersResponse.map((u: UserTypeApi) => {
    const toggleFollowUser = () => {
      if (!u.followed) {
        dispatch(toggleFollowUserTC(u.id, u.followed));
      } else if (u.followed) {
        dispatch(unFollowUserTC(u.id, u.followed))
      }
    }

    return (
      <User key={u.id} user={u}
        toggleFollowUser={toggleFollowUser}
        btnTextToggle={u.followed ? "Unfollowed" : "Follow"}
        btnTexInfo={btnTexInfo}
      />
    );
  });


  return (
    <div className="usersAll">
      <div className="usersAll__list">{usersMap}</div>
      <div className="usersAll__wrap-button">
        <PaginationsCustom currentPage={currentPage} />
      </div>
    </div>
  )
}