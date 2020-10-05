import React from 'react';
import Piano from '../Piano/Piano';
import Staff from '../Staff/Staff';
//import StaffNote from '../Staff/StaffNote';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          keys: ["Bb/4"],
          duration: "2",
        },
        {
          keys: ["D/4"],
          duration: "2"
        },
        {
          keys: ["E/4"],
          duration: "1",
        }        
        // new StaffNote(["c/4"], "1"),
        // new StaffNote(["d/4"], "1"),
        // new StaffNote(["e/4"], "1"),
      ],  
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
        <Piano clickHandler={this.handleClick} />
        <br />
        <button onClick={() => this.addNote({keys: ["C/5", "Eb/5", "G#/5"], duration: "4", dot:[false,true,true]})}> Add B/4 </button>
        <Staff clef='treble' timeSignature='4/4' notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;
