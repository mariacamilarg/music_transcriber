import React from 'react';
import Staff from "../Staff/Staff";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Music transcriber</h1>
      <div className="Stave">
        <Staff />
      </div>

    </div>
    
  );
}

export default App;
