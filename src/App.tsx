import React from 'react';
import './styles/App.scss';

import Header from './components/Header/Header';
import Nav from "./components/Nav/Nav";
import Banner from "./components/Banner/Banner";


function App() {
  return (
    <div className="App">

      < Header />
      < Nav  />
      <div className="App__content">
       <Banner />
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

