import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = keyNote => {
    this.props.clickHandler(keyNote);
  };

  render() {
    return (
      <div className="component-piano">
        <PianoKey note="C" octave="4" keyboardLetter="A" clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="D" octave="4" keyboardLetter="S" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="E" octave="4" keyboardLetter="D" clickHandler={this.handleClick} />
        <PianoKey note="F" octave="4" keyboardLetter="F" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="G" octave="4" keyboardLetter="G" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="A" octave="4" keyboardLetter="H" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="B" octave="4" keyboardLetter="J" clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
