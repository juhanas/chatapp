import React, { Component } from 'react';
import logo from './logo.png';
import './styles/index.css';
import './styles/App.scss';

import Chat from './components/chat';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <div className="App-header row">
          <div className="col-xs-12">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>The Chat</h1>
          </div>
        </div>
        <Chat/>
      </div>
    );
  }
}

export default App;
