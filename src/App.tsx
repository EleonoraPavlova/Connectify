import React from 'react';
import './styles/App.scss';

import Header from './common/Header/Header';
import Nav from "./components/Nav/Nav";
import Footer from "./common/Footer/Footer";

import RoutesComponents from "./routes";
import { DialogsPage, ProfilePage, FriendsPage } from "./state/dataState";



type AppProps = DialogsPage & ProfilePage & FriendsPage;


const App = (props: AppProps) => {
  return (
    <div className="App">
      < Header />
      < Nav />
      < RoutesComponents {...props} />
      < Footer />
    </div >

  );
}

export default App;

