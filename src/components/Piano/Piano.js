import React from 'react';
import PropTypes from "prop-types";
import './Piano.css';

import PianoKey from '../PianoKey/PianoKey';

class Piano extends React.Component {

  static propTypes = {
    octave: PropTypes.string,
    clickHandler: PropTypes.func,
    mouseUpHandler: PropTypes.func,
    octavePlus: PropTypes.func,
    octaveMinus: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      //octave: props.octave
    };
  };

  handlemouseUp = t =>{
    this.props.mouseUpHandler(t);
  }

  handleClick = keyNote => {
    this.props.clickHandler(keyNote);
  };

  octaveMinus = () => {
    this.props.octaveMinus();
  };

  octavePlus = () => {
    this.props.octavePlus();
  };

  render() {
    return (
      <div className="component-piano">
        <button className="octave-dialer" onClick={this.octaveMinus}>
          &lt;
        </button>
        <PianoKey note="C" octave={this.props.octave} keyboardLetter="A" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey />
        <PianoKey note="D" octave={this.props.octave} keyboardLetter="S" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="E" octave={this.props.octave} keyboardLetter="D" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
        <PianoKey note="F" octave={this.props.octave} keyboardLetter="F" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="G" octave={this.props.octave} keyboardLetter="G" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="A" octave={this.props.octave} keyboardLetter="H" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} hasSharpKey/>
        <PianoKey note="B" octave={this.props.octave} keyboardLetter="J" mouseUpHandler={this.handlemouseUp} clickHandler={this.handleClick} />
        <button className="octave-dialer" onClick={this.octavePlus}>
          &gt;
        </button>
      </div>
    );
  }
}

export default Piano;
