import React, { useEffect } from 'react';
import './index.scss';
import { useSelector } from "react-redux";
import { AppRootStateType } from "src/state/store";
import { usersItem } from "src/state/initialState";
import { User } from "./User/User";
import { Button } from "src/common/Button/Button";
import { useDispatch } from "react-redux";
import { setUsersAC, toggleFollowUserAC } from "src/reducers/users/usersPageReducer";



export const Users = () => {
  const users = useSelector<AppRootStateType, usersItem[]>(state => state.usersPage.usersData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUsersAC())
  }, [dispatch])

  const usersMap = users.map((u: usersItem) => {
    const toggleFollowUser = () => {
      dispatch(toggleFollowUserAC(u.id, u.followed));
    }
    return (
      <User key={u.id} user={u} toggleFollowUser={toggleFollowUser} btnText={u.followed ? "Unfollowed" : "Follow"} />
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