import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static propTypes = {
    octave: PropTypes.string,
    clickHandler: PropTypes.func,
  };

  handleClick = keyNote => {
    this.props.clickHandler(keyNote);
  };

  render() {
    return (
      <div className="component-piano">
        <PianoKey note="C" octave={this.props.octave} keyboardLetter="A" clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="D" octave={this.props.octave} keyboardLetter="S" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="E" octave={this.props.octave} keyboardLetter="D" clickHandler={this.handleClick} />
        <PianoKey note="F" octave={this.props.octave} keyboardLetter="F" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="G" octave={this.props.octave} keyboardLetter="G" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="A" octave={this.props.octave} keyboardLetter="H" clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="B" octave={this.props.octave} keyboardLetter="J" clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
