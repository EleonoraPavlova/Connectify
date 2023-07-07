import React from 'react';
// import {HashRouter} from 'react-router-dom';
import './styles/App.scss';

import Header from './components/Header/Header';
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";



function App() {
  return (
    <div className="App">
      < Header />
      < Nav />
      < Profile />
      < Footer />
    </div>
  );
}

export default App;

