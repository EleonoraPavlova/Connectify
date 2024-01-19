import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { Header } from './common/Header/Header';
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./common/Footer/Footer";
import RoutesComponents from "./routes";
import { SnackbarComponent } from "./components/Snackbar/SnackbarComponent";
import { useAppDispatch, useAppSelector } from "./state/hooks/hooks-selectors";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { setInitializeAppTC } from "./state/reducers/app-reducer/appReducer";
import CircularProgress from "@mui/material/CircularProgress";


const App = () => {
  let initialized = useAppSelector<boolean>(state => state.app.initialized)
  let isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setInitializeAppTC())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn && initialized) {
      navigate('/login')
    }
  }, [isLoggedIn, initialized, navigate])


  if (!initialized) { //loader во время проверки срока куки и настроек
    return (
      <Box
        sx={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: "#008000", strokeWidth: 1 }} thickness={1} />
      </Box>
    )
  }

  return (<>
    <SnackbarComponent />
    <div className="App">
      < Header />
      < Nav />
      < RoutesComponents />
      < Footer />
    </div >
  </>
  );
}

export default App;