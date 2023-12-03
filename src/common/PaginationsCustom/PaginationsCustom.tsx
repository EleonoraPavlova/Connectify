import React from 'react';
import { Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";


export type PaginationsCustomType = {
  currentPage: number
  setCurrentPage: (currPage: number) => void
  pagesCount: number
}

export const PaginationsCustom: React.FC<PaginationsCustomType> = ({ currentPage, pagesCount, setCurrentPage }) => {
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
    setCurrentPage(page)
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