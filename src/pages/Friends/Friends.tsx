import React, { useEffect } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { UserTypeApi } from "src/api/usersApi";
import { getUsersTC, toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";
import { User } from "../FindUsers/User/User";
import { Button } from "src/common/Button/Button";


export const Friends = () => {
  const users = useAppSelector<UserTypeApi[]>(state => state.usersPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersTC(10, 1, true))
  }, [])

  const usersMap = users.map((u: UserTypeApi) => {
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
        btnText={u.followed ? "Unfollowed" : "Follow"} />
    );
  });

  const showMoreHandler = () => {
    alert("Show more")
  }

  return (
    <div className="friends">
      <div className="friends__list">
        {usersMap}
      </div>
      <div className="users__wrap-button">
        <Button name="Show more" additionalClass="users__button" callBack={showMoreHandler} />
      </div>
    </div>

  )
}