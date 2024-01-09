import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./state/store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store} >
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ThemeProvider >
);

reportWebVitals();