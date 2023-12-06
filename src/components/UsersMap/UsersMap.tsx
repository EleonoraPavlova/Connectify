import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { UserTypeApi } from "src/api/usersApi";
import { User } from "src/pages/FindUsers/User/User";
import { useAppDispatch } from "src/state/hooks/hooks-selectors";
import { getProfileUserTC } from "src/state/reducers/userProfile/userProfileReducer";
import { toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";

export type UsersMapType = {
  btnTextInfo: string
  user: UserTypeApi
}

export const UsersMap: React.FC<UsersMapType> = ({ btnTextInfo, user }) => {
  const [activeModal, setActiveModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()


  const toggleFollowUser = () => {
    if (!user.followed) {
      dispatch(toggleFollowUserTC(user.id, user.followed));
    } else if (user.followed) {
      dispatch(unFollowUserTC(user.id, user.followed))
    }
  }

  const viewFullProfile = () => {
    dispatch(getProfileUserTC(user.id))
    setActiveModal(true)
    setSearchParams({ id: `${user.id}` })
  }

  const sendMessage = () => {
    alert("Will send")
  }

  return (
    <User key={user.id} user={user}
      toggleFollowUser={toggleFollowUser}
      btnTextToggle={user.followed ? "Unfollowed" : "Follow"}
      callBack={() => btnTextInfo === "Message" ? sendMessage() : viewFullProfile()}
      btnTexInfo={btnTextInfo}
    />
  );
}