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
        <PianoKey note="Do" octave="4" keyboardLetter="A" clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="Re" octave="4" keyboardLetter="S" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Mi" octave="4" keyboardLetter="D" clickHandler={this.handleClick} />
        <PianoKey note="Fa" octave="4" keyboardLetter="F" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Sol" octave="4" keyboardLetter="G" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="La" octave="4" keyboardLetter="H" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Si" octave="4" keyboardLetter="J" clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
