import React from 'react';
import Metronome from '../Metronome/Metronome';
import PropTypes from "prop-types";
import "./Controls.css";

class Controls extends React.Component {

  static propTypes = {
    bpm: PropTypes.number,
    bpmMinus: PropTypes.func,
    bpmPlus: PropTypes.func,
    changeBpm: PropTypes.func,
    play: PropTypes.func,
  };

  render() {
    return (
      <div className="controls">
        <Metronome bpm={this.props.bpm} clickMinus={this.props.bpmMinus} clickPlus={this.props.bpmPlus} changeInput={this.props.changeBpm}/>
        <button onClick={this.props.play}>Play</button>
      </div>
    );
  }
}

export default Controls;
