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
      <div className="component-button-panel">
        <div>
          <PianoKey note="C" keyboardLetter="A" clickHandler={this.handleClick} />
          <PianoKey note="C# Db" keyboardLetter="W" clickHandler={this.handleClick} blackKey />
          <PianoKey note="D" keyboardLetter="S" clickHandler={this.handleClick} />
          <PianoKey note="D# Eb" keyboardLetter="E" clickHandler={this.handleClick} blackKey />
          <PianoKey note="E" keyboardLetter="D" clickHandler={this.handleClick} />
          <PianoKey note="E# Fb" keyboardLetter="R" clickHandler={this.handleClick} blackKey />
          <PianoKey note="F" keyboardLetter="F" clickHandler={this.handleClick} />
          <PianoKey note="F# Gb" keyboardLetter="T" clickHandler={this.handleClick} blackKey />
          <PianoKey note="G" keyboardLetter="G" clickHandler={this.handleClick} />
          <PianoKey note="G# Ab" keyboardLetter="Y" clickHandler={this.handleClick} blackKey />
          <PianoKey note="A" keyboardLetter="H" clickHandler={this.handleClick} />
          <PianoKey note="B" keyboardLetter="J" clickHandler={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default Piano;
