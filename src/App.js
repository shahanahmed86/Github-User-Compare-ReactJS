import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import User from './component/user.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <User />
      </div>
    );
  }
}

export default App;
