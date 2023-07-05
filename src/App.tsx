import React from 'react';
import './App.css';

// import Header from './Header';
// import Technologies from "./Technologies";
// import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      {/* < Header title={'This is header'} />
      < Technologies title={1} />
      <Footer title={'This is footer'} /> */}
      <header className="header">
        <img src="https://cdn.pixabay.com/photo/2016/06/09/18/36/logo-1446293_1280.png" />  
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
        <div className="content-image">
          <img src="https://media.istockphoto.com/id/905101900/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D1%80%D0%BE%D0%BF%D1%96%D1%87%D0%BD%D1%96-%D0%B4%D0%B6%D1%83%D0%BD%D0%B3%D0%BB%D1%96.jpg?s=612x612&w=0&k=20&c=xOYOqdlVwZ0Q22Agw0GCtlADXd6u8SSwommUXan4j_w=" />  
        </div>
      </div>

    </div>
  );
}

export default App;

