import React from 'react';
import MyStaff from '../Staff/MyStaff';
//import Staff from "../Staff/Staff";
//import StaveClass from '../Staff/StaveClass';

import './App.css';

import Piano from '../Piano/Piano';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: "this should update the stave",
      operation: null,
      notes: ["c/4","d/4", "e/4", "f/4", "g/4", "a/4"]
    };
  };

  handleClick(note) {
    //this.setState(calculate(this.state, buttonName));
    console.log(note);
    //console.log(this.state.msg);
  };

  addNote(note) {
    console.log("New note : " + note);
    console.log(this.state.notes);
    this.state.notes.push("b/4");
    console.log(this.state.notes);
    //this.forceUpdate();
  }

  render(){
    return (
      <div className="App">
        <h1>Music transcriber</h1>
        <Piano clickHandler={this.handleClick} />
        <br />
        <button onClick={() => this.addNote("b/4")}> Add B/4 </button>
        <MyStaff clef='treble' timeSignature='4/4' notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;
