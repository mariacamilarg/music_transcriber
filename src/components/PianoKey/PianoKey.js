import React from 'react';
import PropTypes from "prop-types";
import "./PianoKey.css";
import playTone from "../../libs/simpleTones";

/* 
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
* https://theremin.app/
* https://virtualpiano.net/
* https://codepen.io/ayjsheng/pen/WNeyZLB
* https://github.com/otanim/virtual-piano
* https://ourcodeworld.com/articles/read/293/rendering-music-notation-music-sheet-in-javascript-with-vexflow-2
* https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
* https://github.com/GermaVinsmoke/bmi-calculator/tree/master/src
* https://github.com/ahfarmer/calculator/tree/master/src/component
* https://codepen.io/gabrielcarol/pen/rGeEbY
* https://carolinegabriel.com/javascript-piano/
--
* Vex flow https://github.com/markacola/react-vexflow/blob/master/src/index.js
*/

class PianoKey extends React.Component {

  static propTypes = {
    note: PropTypes.string,
    octave: PropTypes.string,
    keyboardLetter: PropTypes.string,
    hasSharpKey: PropTypes.bool,
    clickHandler: PropTypes.func,
    mouseUpHandler: PropTypes.func
  };

  abcNotes = {
    "Do": 'C',
    "Re": 'D',
    "Mi": 'E',
    "Fa": 'F',
    "Sol": 'G',
    "La": 'A',
    "Si": 'B'
  };

  onMouseDown = () =>{
    this.start=Date.now();
  }

  onMouseUp = () =>{
    const t=Date.now() - this.start;
    this.start=0;
    var vexflowNote = this.props.note + "/" + this.props.octave;
    this.props.mouseUpHandler({time:t, note:vexflowNote});
  }

  onMouseUpSharp = () =>{
    const t=Date.now() - this.start;
    var vexflowNote = this.props.note + "#/" + this.props.octave;
    this.props.mouseUpHandler({time:t, note:vexflowNote});
  }

  handleClick = () => {
    var abcNoteWithOctave = this.props.note + this.props.octave;
    playTone(abcNoteWithOctave);
  };

  handleClickSharp = () => {
    var abcNoteWithOctave = this.props.note + "#" + this.props.octave;
    playTone(abcNoteWithOctave);
  };

  render() {
    //const className = this.props.blackKey ? "component-key black" : "component-key";
    return (
      <div className="component-key">
        <button className="white" onClick={this.handleClick} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          {this.props.note}
        </button>
        { 
          this.props.hasSharpKey && 
          <button className="black" onClick={this.handleClickSharp} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUpSharp}>
            {this.props.note + "#"}
          </button> 
        }
      </div>
    );
  }
}

export default PianoKey;
