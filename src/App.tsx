import React from 'react';
// import {HashRouter} from 'react-router-dom';
import './styles/App.scss';

import Header from './components/Header/Header';
import Nav from "./components/Nav/Nav";
import MainContent from "./components/MainContent/MainContent";



function App() {
  return (
    <div className="App">
      < Header />
      < Nav />
      <MainContent />
    </div>
  );
}

export default App;

