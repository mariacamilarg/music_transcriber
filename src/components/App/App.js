import React from 'react';
import Piano from '../Piano/Piano';
import Staff from '../Staff/Staff';
//import StaffNote from '../Staff/StaffNote';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],  
    };
    this.tempo=120;
    this.handleClick = this.handleClick.bind(this);
    this.handlemouseUp = this.handlemouseUp.bind(this);
  };

  handlemouseUp(data){
    console.log("Mouse is Down for :"+data.time);
    var long= data.time;
    var mt = ((60*1000)/this.tempo)/4;
    console.log("MinTime = "+mt);
    var d="0";
    var dot=[false];
    if(long<mt*3){
      //8th
      d="8";
    }
    else if(long>=mt*3 && long<mt*5){
      //quater/black
      d="4";
    }
    else if(long>=mt*5 && long<mt*7){
      //quater dot
      d="4";
      dot=[true];
    }
    else if(long>=mt*7 && long<mt*10){
      // white
      d="2";
    }
    else if(long>=mt*10 && long<mt*14){
      //white dot
      d="2";
      dot=[true];
    }
    else{
      //round
      d="1";
    }
    this.addNote({keys: [data.note], duration: d, dot: dot});
  }

  handleClick(note) {
    console.log(this);
    this.addNote({keys: [note], duration: "4"});
  };

  addNote(note) {
    this.setState({
      notes: this.state.notes.concat([note])
    });
    //this.forceUpdate();
  }

  render(){
    return (
      <div className="App">
        <h1>Music transcriber</h1>
        <Piano clickHandler={this.handleClick} mouseUpHandler={ this.handlemouseUp } />
        <br />
        <Staff clef='treble' timeSignature='4/4' notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;
