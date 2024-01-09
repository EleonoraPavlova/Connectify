import React, { useEffect } from 'react';
import './styles/App.scss';
import { Header } from './common/Header/Header';
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./common/Footer/Footer";
import RoutesComponents from "./routes";
import { SnackbarComponent } from "./components/Snackbar/SnackbarComponent";
import { useAppSelector } from "./state/hooks/hooks-selectors";
import { Start } from "./pages/Start/Start";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


const App = () => {
  let initialized = useAppSelector<boolean>(state => state.app.initialized)
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) {
      navigate('/profile')
    } else {
      navigate('/')
    }
  }, [initialized, navigate])

  if (!initialized) { //loader во время проверки срока куки и настроек
    return (
      <Box sx={{
        display: 'flex', alignItems: "center", justifyContent: 'center',
        height: '100%', backgroundColor: 'rgba(194, 197, 204, 0.4)',
        borderRadius: "15px", margin: "30px 0px", overflow: "none", padding: "150px 0"
      }}>
        <Start />
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