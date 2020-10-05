import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static propTypes = {
    clickHandler: PropTypes.func,
    mouseUpHandler: PropTypes.func,
  };

  handlemouseUp = t =>{
    this.props.mouseUpHandler(t);
  }

  handleClick = keyNote => {
    this.props.clickHandler(keyNote);
  };

  render() {
    return (
      <div className="component-piano">
        <PianoKey note="C" octave="4" keyboardLetter="A" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="D" octave="4" keyboardLetter="S" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="E" octave="4" keyboardLetter="D" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
        <PianoKey note="F" octave="4" keyboardLetter="F" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="G" octave="4" keyboardLetter="G" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="A" octave="4" keyboardLetter="H" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="B" octave="4" keyboardLetter="J" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
