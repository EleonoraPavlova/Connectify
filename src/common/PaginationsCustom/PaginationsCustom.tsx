import React, { useEffect } from 'react';
import { Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";
import { pagesCountAC, setCurrentPageAC } from "src/state/reducers/users/usersReducer";
import { useAppDispatch, useAppSelector } from "src/state/hooks/hooks-selectors";

export type PaginationsCustomType = {
  currentPage: number
  totalCount: number
}

export const PaginationsCustom: React.FC<PaginationsCustomType> = ({ currentPage, totalCount }) => {
  const pagesCount = useAppSelector<number>(state => state.usersPage.pagesCount);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(pagesCountAC(totalCount))
  }, [totalCount])

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

  const setCurrentPageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPageAC(page))
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={10} >
        <Pagination count={pagesCount} size="small"
          siblingCount={4}
          shape="rounded"
          page={currentPage}
          onChange={setCurrentPageHandler}
        />
      </Stack>
    </ThemeProvider >
  )
}