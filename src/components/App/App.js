import React from 'react';
import MyStaff from '../Staff/MyStaff';
//import Staff from "../Staff/Staff";
//import StaveClass from '../Staff/StaveClass';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Music transcriber</h1>
      <div id="Stave">
        <MyStaff mynotes={["c/4","d/4", "e/4", "f/4", "g/4", "a/4"]}/>
      </div>

    </div>
    
  );
}

export default App;
