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
        <img className="App__header-img" src="https://cdn.pixabay.com/photo/2016/06/09/18/36/logo-1446293_1280.png" alt="logo" /> 
        <h6 className="App__header-text">Social net</h6>
      </header>
      <nav className="App__nav">
        <ul>
          <li className="App__nav-item"><a href="#" className="App__nav-link">Profile</a> </li>
          <li className="App__nav-item"><a href="#" className="App__nav-link">Messages</a></li>
          <li className="App__nav-item"><a href="#" className="App__nav-link">News</a></li>
          <li className="App__nav-item"><a href="#" className="App__nav-link">Music</a></li>
          <li className="App__nav-item"><a href="#" className="App__nav-link">Settings</a></li>
        </ul>
      </nav>
      <div className="App__content">
        <div className="App__content-banner"></div>
        <div className="App__content-personal flex-start" ><div>
            <img src="https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg" alt="avatar" className="App__content-personal-avatar"/>
          </div>
          <ul>
          <li className="App__content-personal-item"><h4 className="App__content-personal-name">Eleonora P.</h4></li>
          <li className="App__content-personal-item"><b className="App__content-personal-item-b">Date of Birth:</b>  18 August </li>
          <li className="App__content-personal-item"><b className="App__content-personal-item-b">City:</b> Kyiv </li>
          <li className="App__content-personal-item"><b className="App__content-personal-item-b">Education: </b>Marine Academy </li>
          <li className="App__content-personal-item"><b className="App__content-personal-item-b">Git:</b> <a className="App__content-personal-link" href="https://github.com/EleonoraPavlova?tab=repositories"> tap </a></li>
          </ul>
        </div>
        <form className="App__content-posts" action="#">
          <label htmlFor="posts" className="App__content-posts-label">My posts</label>
          <textarea className="App__content-posts-texarea" placeholder="My news...." id="posts" name="posts" />
          <div className="flex-end"><input className="App__content-posts-send" type="submit" value="Send" /></div>
        </form>
        <div className="App__content-wall">
          <h6 className="App__content-wall-header">Post 1</h6>
          <p>There is a post here....</p>
        </div>
      </div>

    </div>
  );
}

export default App;

