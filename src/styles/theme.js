import { createTheme } from '@mui/material/styles';


// const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
//   "& circle": {
//     strokeWidth: 2,
//     stroke: lime[500],
//   },
// }));

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
          },
          '&:focus': {
            outline: '1px solid #008000',
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
  },
});

export default theme;