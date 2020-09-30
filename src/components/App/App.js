import React from 'react';
import MyStaff from '../Staff/MyStaff';
//import Staff from "../Staff/Staff";
//import StaveClass from '../Staff/StaveClass';

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
      <Piano clickHandler={handleClick} />
      <div id="Stave">
        <MyStaff mynotes={["c/4","d/4", "e/4", "f/4", "g/4", "a/4"]}/>
      </div>


      <br />
      
    </div>
    
  );
}

export default App;
