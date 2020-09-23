import React from 'react';
//import logo from '../../images/logo.svg';
import './App.css';

import Piano from '../Piano/Piano';

function App() {

  var state = {
    msg: "this should update the stave",
    operation: null,
  };

  function handleClick(note) {
    //this.setState(calculate(this.state, buttonName));
    console.log(note);
    console.log(state.msg);
  };

  return (
    <div className="App">
      <h1>Music transcriber</h1>
      <br />
      <Piano clickHandler={handleClick} />
    </div>
  );
}

export default App;
