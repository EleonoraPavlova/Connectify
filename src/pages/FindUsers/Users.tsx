import React, { useEffect } from 'react';
import './index.scss';
import { User } from "./User/User";
import { Button } from "src/common/Button/Button";
import { getUsersTC, toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { UserTypeApi } from "src/api/usersApi";
// import { Modal } from "src/components/Modal/Modal";


export const Users = () => {
  const users = useAppSelector<UserTypeApi[]>(state => state.usersPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersTC(20, 1, false))
  }, [])


  const usersMap = users.map((u: UserTypeApi) => {
    const toggleFollowUser = () => {
      if (!u.followed) {
        dispatch(toggleFollowUserTC(u.id, u.followed));
      } else if (u.followed) {
        dispatch(unFollowUserTC(u.id, u.followed))
      }
    }

    const viewFullProfile = () => {
      console.log("viewFullProfile")
      // return (<Modal profileId={u.id} />)
    }
    return (
      <User key={u.id} user={u}
        toggleFollowUser={toggleFollowUser}
        viewFullProfile={viewFullProfile}
        btnTextToggle={u.followed ? "Unfollowed" : "Follow"}
        btnTexInfo={"Full info"}
      />
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