import React, { useEffect } from 'react';
import './index.scss';
import { setCurrentPageAC, setResponseTC, switchLoaderAC, toggleFollowUserTC, unFollowUserTC } from 'src/state/reducers/users/usersReducer';
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks-selectors';
import { UserTypeApi } from 'src/api/usersApi';
import { User } from 'src/pages/FindUsers/User/User';
import { PaginationsCustom } from '../PaginationsCustom/PaginationsCustom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export type UsersType = {
  friend: boolean
  btnTexInfo: string
}

export const UsersAll: React.FC<UsersType> = ({ friend, btnTexInfo }) => {
  const usersResponse = useAppSelector<UserTypeApi[]>(state => state.usersPage.items)
  const currentPage = useAppSelector<number>(state => state.usersPage.currentPage);
  const totalCount = useAppSelector<number>(state => state.usersPage.totalCount);
  // const isLoader = useAppSelector<boolean>(state => state.usersPage.isLoader);
  const pageSize = 15
  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(switchLoaderAC(true))
    dispatch(setResponseTC(pageSize, currentPage, friend))
    // dispatch(switchLoaderAC(false))
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

  console.log("totalCount", totalCount)
  return (<>
    <div className="usersAll">
      <div className="usersAll__list">{usersMap}</div>
      <div className="usersAll__wrap-button">
        <PaginationsCustom currentPage={currentPage} totalCount={totalCount} />
      </div>
    </div>
  </>
  )
}

// {
//   isLoader ?
//     <Stack sx={{ color: 'grey.500' }} >
//       <CircularProgress color="success" />
//     </Stack>
//     :