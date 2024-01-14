import React from 'react';
import { Box, Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";


export type PaginationsCustomType = {
  currentPage: number
  pagesCount: number
  setCurrentPage: (currPage: number) => void
}

export const PaginationsCustom: React.FC<PaginationsCustomType> = ({ pagesCount, currentPage, setCurrentPage }) => {

  const theme = createTheme({
    typography: {
      fontFamily: 'Handlee, sans-serif',
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          "root": {
            "&.Mui-selected": {
              backgroundColor: "#c2c5cc",
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
    <Box className="pagination">
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
    </Box>
  )
}