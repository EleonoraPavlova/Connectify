import React from 'react';
import './index.scss';
import { useSelector } from "react-redux";
import { AppRootState } from "src/state/store";
import { usersItem } from "src/state/dataState";
import { User } from "./User/User";
import { Button } from "src/common/Button/Button";
import { useDispatch } from "react-redux";
import { toggleFollowUserAC } from "src/reducers/users/usersPageReducer";


export const Users = () => {
  const users = useSelector<AppRootState, usersItem[]>(state => state.usersPage.usersData)
  const dispatch = useDispatch()

  const usersMap = users.map((u: usersItem) => {
    const unFollowUser = () => {
      dispatch(toggleFollowUserAC(u.id, u.followed));
    }

    return (
      <User key={u.id} user={u} toggleFollowUser={unFollowUser} btnText={u.followed ? "Unfollowed" : "Follow"} />
    );
  });


  const showMoreHandler = () => {
    alert("Show more")
  }

  return (<div className="users">
    <div className="users__list">{usersMap}</div>
    <div className="users__wrap-button">
      <Button name="Show more" additionalClass="users__button" callBack={showMoreHandler} />
    </div>
  </div>
  )
}