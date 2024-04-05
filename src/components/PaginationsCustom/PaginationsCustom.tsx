import React, { useCallback } from 'react'
import './index.scss'
import { Box, Pagination, Stack, ThemeProvider, createTheme } from '@mui/material'

type PaginationsCustomProps = {
  currentPage: number
  pagesCount: number
  setCurrentPage: (currPage: number) => void
}

export const PaginationsCustom: React.FC<PaginationsCustomProps> = ({ pagesCount, currentPage, setCurrentPage }) => {
  console.log('currentPage', currentPage)
  const theme = createTheme({
    typography: {
      fontFamily: 'Handlee, sans-serif',
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#c2c5cc',
            },
          },
        },
      },
    },
  })

  const setCurrentPageHandler = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page)
    },
    [currentPage]
  )

  if (pagesCount === 0) return null

  return (
    <Box className="pagination">
      <ThemeProvider theme={theme}>
        <Stack spacing={10}>
          <Pagination
            count={pagesCount}
            size="small"
            siblingCount={4}
            shape="rounded"
            page={currentPage}
            onChange={setCurrentPageHandler}
          />
        </Stack>
      </ThemeProvider>
    </Box>
  )
}
