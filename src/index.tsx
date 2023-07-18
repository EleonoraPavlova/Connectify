import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import dataState from "./state/dataState"
import { HashRouter } from 'react-router-dom'




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement

);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App dialogsData={dataState.dialogsPage.dialogsData} messagesData={dataState.dialogsPage.messagesData}
        postsData={dataState.profilePage.postsData} friendsData={dataState.friendsPage.friendsData} />
    </HashRouter>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
