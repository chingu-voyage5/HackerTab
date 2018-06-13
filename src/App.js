import React, { Component } from 'react';
import logo from './hn-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-brand"><img src={logo} className="App-logo" alt="logo" /> Hacker News</div>
        </header>
        <main className="container">
          <p className="App-intro">
            Some Hacker News News will load here
          </p>
        </main>
      </div>
    );
  }
}

export default App;
