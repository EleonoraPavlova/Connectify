import React from 'react';
import './styles/App.scss';

// import Header from './Header';
// import Technologies from "./Technologies";
// import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      {/* < Header title={'This is header'} />
      < Technologies title={1} />
      <Footer title={'This is footer'} /> */}
      <header className="App__header">
        <img src="https://cdn.pixabay.com/photo/2016/06/09/18/36/logo-1446293_1280.png" alt="logo"/>  
      </header>
      <nav className="nav">
        <ul>
          <li><a>Profile</a> </li>
          <li><a>Messages</a></li>
          <li><a>News</a></li>
          <li><a>Music</a></li>
          <li><a>Settings</a></li>
        </ul>
      </nav>
      <div className="content">
        <div className="content-image"></div>
        <div className="personal-info flex" ><div>
            <img src="https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg" alt="avatar" />
          </div>
          <ul>
          <li><h4>Eleonora P.</h4></li>
          <li><span>Date of Birth:</span>  18 August </li>
          <li><span>City:</span> Kyiv </li>
          <li><span>Education: </span>Marine Academy </li>
          <li><span>Git:</span> <a href="https://github.com/EleonoraPavlova?tab=repositories"> tap </a></li>
          </ul>
        </div>
        <div className="content-image">

        </div>
      </div>

    </div>
  );
}

export default App;

