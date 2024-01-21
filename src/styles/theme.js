import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Handlee, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            borderColor: '#008000',
            backgroundColor: 'transparent'
          },
          '&:focus': {
            outline: '1px solid #008000 !important',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#c2c5cc',
          '&.Mui-checked': {
            color: '#008000',
          },
          '&:hover': {
            borderColor: '#008000',
          },
          '&:focus': {
            outline: '1px solid #008000',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Handlee, sans-serif',
        },
      },
    },
  },
});

export default theme;