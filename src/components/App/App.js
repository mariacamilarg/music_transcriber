import React from 'react';
import Piano from '../Piano/Piano';
import Video from '../Video/Video';
import Staff from '../Staff/Staff';
//import StaffNote from '../Staff/StaffNote';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          keys: ["c/4"],
          duration: "1",
        },
        {
          keys: ["d/4"],
          duration: "1",
        },
        {
          keys: ["e/4"],
          duration: "1",
        }        
        // new StaffNote(["c/4"], "1"),
        // new StaffNote(["d/4"], "1"),
        // new StaffNote(["e/4"], "1"),
      ],
      octave: "4" 
    };
  };

  handleClick(note) {
    console.log(note);
    console.log("this should update the stave");
  };

  addNote(note) {
    console.log("New note : " + note.keys);
    this.setState({
      notes: this.state.notes.concat([note])
    });
    //this.forceUpdate();
  }

  render(){
    return (
      <div className="App">
        <h1>Music transcriber</h1>
        <br />
        <div className="components-upper">
          <Piano octave={this.state.octave} clickHandler={this.handleClick} />
          <Video url="https://www.youtube.com/watch?v=Vgt1d3eAm7A" />
        </div>
        <br />
        <br />
        <button onClick={() => this.addNote({keys: ["b/4"], duration: "1"})}> Add B/4 </button>
        <Staff clef='treble' timeSignature='4/4' notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;
