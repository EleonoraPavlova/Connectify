import React, { useEffect } from 'react';
import './index.scss';
import { User } from "./User/User";
import { getResponseTC, setCurrentPageAC, toggleFollowUserTC, unFollowUserTC } from "src/state/reducers/users/usersReducer";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";
import { ResponseUsersType, UserTypeApi } from "src/api/usersApi";
import { Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";


export const Users = () => {
  const usersResponse = useAppSelector<ResponseUsersType>(state => state.usersPage)
  const currentPage = useAppSelector<number>(state => state.usersPage.currentPage);
  let { items, totalCount } = usersResponse
  const dispatch = useAppDispatch()

  useEffect(() => {
    const pageSize = 15
    dispatch(getResponseTC(pageSize, currentPage, false))
  }, [currentPage])

  const pagesCount = Math.ceil(totalCount / 15)

  const usersMap = items.map((u: UserTypeApi) => {
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


  const setCurrentPageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPageAC(page))
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Handlee, sans-serif',
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          "root": {
            "&.Mui-selected": {
              backgroundColor: "#c2c5cc", // Цвет фона для активного элемента
            },
          },
        },
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="users">
        <div className="users__list">{usersMap}</div>
        <div className="users__wrap-button">
          <Stack spacing={10} >
            <Pagination count={pagesCount} size="small"
              siblingCount={4}
              shape="rounded"
              page={currentPage}
              onChange={setCurrentPageHandler}
            />
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  )
}