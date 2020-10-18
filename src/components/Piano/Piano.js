import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static propTypes = {
    clickHandler: PropTypes.func,
    mouseUpHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      octave:props.octave
    };
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
        <PianoKey note="C" octave={this.state.octave} keyboardLetter="A" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="D" octave={this.state.octave} keyboardLetter="S" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="E" octave={this.state.octave} keyboardLetter="D" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
        <PianoKey note="F" octave={this.state.octave} keyboardLetter="F" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="G" octave={this.state.octave} keyboardLetter="G" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="A" octave={this.state.octave} keyboardLetter="H" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="B" octave={this.state.octave} keyboardLetter="J" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Piano;
