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
        <PianoKey note="Do" octave="5" keyboardLetter="A" clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="Re" octave="5" keyboardLetter="S" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Mi" octave="5" keyboardLetter="D" clickHandler={this.handleClick} />
        <PianoKey note="Fa" octave="5" keyboardLetter="F" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Sol" octave="5" keyboardLetter="G" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="La" octave="5" keyboardLetter="H" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Si" octave="5" keyboardLetter="J" clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
