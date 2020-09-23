import React from 'react';
import Stave from "../Stave/Stave";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Music transcriber</h1>
      <div className="Stave">
        <canvas id="canvas"></canvas>
        <Stave/>
      </div>

    </div>
    
  );
}

export default App;
