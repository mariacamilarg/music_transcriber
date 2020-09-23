import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static notes = {
    DO: 'C',
    RE: 'D',
    MI: 'E',
    FA: 'F',
    SOL: 'G',
    LA: 'A',
    SI: 'B'
  };

  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = keyNote => {
    this.props.clickHandler(keyNote);
  };

  render() {
    return (
      <div className="component-piano">
        <PianoKey note="Do" keyboardLetter="A" clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="Re" keyboardLetter="S" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Mi" keyboardLetter="D" clickHandler={this.handleClick} />
        <PianoKey note="Fa" keyboardLetter="F" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Sol" keyboardLetter="G" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="La" keyboardLetter="H" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="Si" keyboardLetter="J" clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
