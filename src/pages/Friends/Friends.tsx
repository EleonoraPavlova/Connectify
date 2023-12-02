import React, { useEffect } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { ResponseUsersType, UserTypeApi } from "src/api/usersApi";
import { getResponseTC, toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";
import { User } from "../FindUsers/User/User";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { Button } from "src/common/Button/Button";


export const Friends = () => {
  const usersResponse = useAppSelector<ResponseUsersType>(state => state.usersPage)
  let { items, totalCount } = usersResponse
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getResponseTC(15, 1, true))
  }, [])

  const usersMap = items.map((u: UserTypeApi) => {
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
        btnTexInfo={"Message"}
      />
    );
  });


  return (
    <div className="friends">
      <div className="friends__list">
        {usersMap}
      </div>
      <div className="users__wrap-button">
        <Stack spacing={8}>
          <Pagination count={10} size="small" shape="rounded" />
        </Stack>
      </div>
    </div>

  )
}