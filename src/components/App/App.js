import React from 'react';
import Piano from '../Piano/Piano';
import Video from '../Video/Video';
import Staff from '../Staff/Staff';
import Controls from '../Controls/Controls';
import playTone from "../../libs/simpleTones";
//import StaffNote from '../Staff/StaffNote';
import './App.css';

class App extends React.Component {

  // CONSTANTS

  keyToNotes = {
    "q": 'C',
    "s": 'D',
    "d": 'E',
    "f": 'F',
    "g": 'G',
    "h": 'A',
    "j": 'B'
  };

  keyToNotesSharp = {
    "z": 'C',
    "e": 'D',
    "t": 'F',
    "y": 'G',
    "u": 'A',
  };

  upperNote = {
    'C':'C#',
    'C#':'D',
    'D' : 'D#',
    "D#":"E",
    'E':'F',
    'F':'F#',
    'F#':'G',
    'G':'G#',
    'G#':'A',
    'A':'A#',
    'A#':'B'
  }

  downerNote = {
    'C#':'C',
    'D' : 'C#',
    "D#":"D",
    'E':'D#',
    'F':'E',
    'F#':'F',
    'G':'F#',
    'G#':'G',
    'A':'G#',
    'A#':'A',
    'B':'A#'
  }

  // CONSTRUCTOR

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      octave:"4",  
      selected:0,
      tempo:60
    };
    this.start=0;
    this.key="";
    this.nbNotes=0;
    //this.handleClick = this.handleClick.bind(this);
    this.handlemouseUp = this.handlemouseUp.bind(this);
    this.bpmPlus = this.bpmPlus.bind(this);
    this.bpmMinus = this.bpmMinus.bind(this);
    this.setBPM = this.setBPM.bind(this);
    this.octavePlus = this.octavePlus.bind(this);
    this.octaveMinus = this.octaveMinus.bind(this);
    this.play = this.play.bind(this);
  };

  // FUNCTIONS

  handlemouseUp(data){
    var long= data.time;
    var mt = ((60*1000)/this.state.tempo)/4;
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

  /*handleClick(note) {
    console.log(this);
    this.addNote({keys: [note], duration: "4"});
  };*/

  addNote(note) {

    this.setState({
      notes: this.state.notes.concat([note]),
      selected: this.nbNotes
    });
    
    this.nbNotes+=1;
    //this.forceUpdate();
  }

  playNote(note){
    playTone(note);
  }

  onKeyDown = (e) => {
    var note;
    var keys;
    var newKeys;
    var k;
    var n;
    var newNote;
    var playToneNote;
    var oc;
    if(this.start===0 && (this.keyToNotes[e.key]!==undefined || this.keyToNotesSharp[e.key]!==undefined)){
      this.start=Date.now();
    }
    // ArrowUp : tone up
    if(String(e.key)==="ArrowUp" && this.state.notes.length>0){
      note=this.state.notes[this.state.selected];//.pop();
      keys=note.keys;
      newKeys=[];
      for(k in keys){
        n=String(keys[k]).split('/');
        newNote="";
        playToneNote="";
        if(e.shiftKey===false){
          if(n[0].includes("B")){
            oc=parseInt(n[1])+1
            newNote="C/"+String(oc);
            playToneNote="C"+String(oc);
          }
          else{
            newNote=this.upperNote[n[0]]+"/"+n[1];
            playToneNote=this.upperNote[n[0]]+n[1];
          }
        }
        else{
          oc=parseInt(n[1])+1;
          newNote=n[0]+"/"+String(oc);
          playToneNote=n[0]+String(oc);
        }
        newKeys.push(newNote);
        playTone(playToneNote);
      }
      note.keys=newKeys;
      this.state.notes.splice(this.state.selected,1,note);
      this.setState({
        notes: this.state.notes
      });
    }
    
    //ArrowDown : tone down
    else if(String(e.key)==="ArrowDown" && this.state.notes.length>0){
      note=this.state.notes[this.state.selected];//.pop();
      keys=note.keys;
      newKeys=[];
      for(k in keys){
        n=String(keys[k]).split('/');
        newNote="";
        playToneNote="";
        if(e.shiftKey){
          oc=parseInt(n[1])-1;
          newNote=n[0]+"/"+String(oc);
          playToneNote=n[0]+String(oc);
        }
        else{
          if(n[0]==="C"){
            oc=parseInt(n[1])-1
            newNote="B/"+String(oc);
            playToneNote="B"+String(oc);
          }
          else{
            newNote=this.downerNote[n[0]]+"/"+n[1];
            playToneNote=this.downerNote[n[0]]+n[1];
          }
        }
        newKeys.push(newNote);
        playTone(playToneNote);
      }
      note.keys=newKeys;
      this.state.notes.splice(this.state.selected,1,note);
      this.setState({
        notes: this.state.notes
      });
    }
    else if((String(e.key)==="ArrowLeft" || String(e.key)==="ArrowRight") && this.state.notes.length>0){
      if(e.shiftKey){
        if(String(e.key)==="ArrowLeft"){
          this.setState({
            selected: Math.max(0,this.state.selected-1)
          });
        }
        else{
          this.setState({
            selected: Math.min(this.nbNotes-1,this.state.selected+1)
          });
        }
      }
      else{
        note=this.state.notes[this.state.selected];//.pop();
        var duration=parseInt(note.duration);
        var dot=note.dot;
        if(String(e.key)==="ArrowLeft"){
          if(duration<8){
            if(dot[0]===true){
              note.dot[0]=false;
            }
            else if(duration===4){
              duration=duration*2;
            }
            else{
              note.dot[0]=true;
              duration=duration*2;
            }
          }
        }
        else{
          if(duration>1){
            if(dot[0]===true || duration===8){
              note.dot[0]=false;
              duration=duration/2;
            }
            else {
              note.dot[0]=true
            }
          }
        }
        dot=note.dot;
        newNote={keys:note.keys, duration:String(duration), dot:dot};
        /*this.setState({
          notes: this.state.notes.concat(newNote)
        });*/

        this.state.notes.splice(this.state.selected,1,newNote);
        this.setState({
          notes: this.state.notes
        });
      }
    }
  }

  onKeyUp = (e) => {
    const t=Date.now() - this.start;
    this.start=0;
    var n=undefined;
    var data=undefined;
    if(this.keyToNotes[e.key]!==undefined){
      this.playNote(this.keyToNotes[e.key]+this.state.octave);
      n=this.keyToNotes[e.key]+"/"+this.state.octave;
    }
    else if(this.keyToNotesSharp[e.key]!==undefined){
      this.playNote(this.keyToNotesSharp[e.key]+"#"+this.state.octave);
      n=this.keyToNotesSharp[e.key]+"#/"+this.state.octave;
      
    }
    if(n!==undefined){
      data={note:n, time:t}
      this.handlemouseUp(data);
    }
  }

  bpmPlus(){
    this.setState({
      tempo: this.state.tempo+1
    });
  }

  bpmMinus(){
    this.setState({
      tempo: this.state.tempo-1
    });
  }

  setBPM(newBPM){
    this.setState({
      tempo: newBPM
    });
  }

  octavePlus() {
    if (this.state.octave !== "8") {
      this.setState({
        octave: parseInt(this.state.octave) + 1 + ""
      });
    }
  }

  octaveMinus() {
    if (this.state.octave !== "0") {
      this.setState({
        octave: parseInt(this.state.octave) - 1 + ""
      });
    }
  }

  play(){
    this.staff.player();
  }

  // RENDER

  render(){
    return (
      <div className="App" tabIndex={0} onKeyDown={(e) => this.onKeyDown(e)} onKeyUp={(e)=>this.onKeyUp(e)}>
        <h1>Music transcriber</h1>
        <br />
        <div className="components-top">
          <Piano octave={this.state.octave} clickHandler={this.handleClick} mouseUpHandler={this.handlemouseUp} octavePlus={this.octavePlus} octaveMinus={this.octaveMinus} />
          <Video url="https://www.youtube.com/watch?v=Vgt1d3eAm7A" />
        </div>
        <div className="components-middle">
          <Controls bpm={this.state.tempo} bpmMinus={this.bpmMinus} bpmPlus={this.bpmPlus} changeBpm={this.setBPM} play={this.play}/>
        </div>
        <div className="components-bottom">
          <Staff ref={child => {this.staff = child}} clef='treble' timeSignature='4/4' notes={this.state.notes} selected={this.state.selected} tempo={this.state.tempo}/>
        </div>
      </div>
    );
  }
}

export default App;
