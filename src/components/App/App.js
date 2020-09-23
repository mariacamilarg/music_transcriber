import React from 'react';
//import logo from '../../images/logo.svg';
import './App.css';

import Piano from '../Piano/Piano';

function App() {

  var state = {
    total: "totalll",
    next: null,
    operation: null,
  };

  function handleClick(note) {
    //this.setState(calculate(this.state, buttonName));
    console.log(note);
    console.log(state.total);
  };

  return (
    <div className="App">
      <div className="component-piano">
        <Piano clickHandler={handleClick} />
      </div>
    </div>
  );
}

export default App;
