import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import Chat from './components/chat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>The Chat</h1>
        </div>
        <div className="App-container">
          <Chat/>
        </div>
      </div>
    );
  }
}

export default App;
