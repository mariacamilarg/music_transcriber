import React from 'react';
import Metronome from '../Metronome/Metronome';
import PropTypes from "prop-types";
import "./Controls.css";

/*
* https://github.com/CookPete/react-player/blob/master/src/demo/App.js
* https://cookpete.com/react-player/
*/

class Controls extends React.Component {

  static propTypes = {
    bpm: PropTypes.number,
    bpmMinus: PropTypes.func,
    bpmPlus: PropTypes.func,
    changeBpm: PropTypes.func,
    play: PropTypes.func,
    pause: PropTypes.func,
    timeElapsed: PropTypes.number,
    handleSeekMouseUp: PropTypes.func,
  };

  constructor(props) {
		super(props)
    this.handleSeekChange=this.handleSeekChange.bind(this);
  }

  handleSeekChange(event) {
    this.props.handleSeekChange(event);
  }
  
  render() {
    return (
      <div className="controls">
        <div className="section">
          <Metronome bpm={this.props.bpm} clickMinus={this.props.bpmMinus} clickPlus={this.props.bpmPlus} changeInput={this.props.changeBpm}/>
        </div>
        
        <div className="section">
          <button onClick={this.props.play}>Play</button>
          <button onClick={this.props.pause}>Pause</button>
        </div>

        <div className="section">
          <label>Seek: </label>
          <input
            type='range' min={0} max={0.999999} step='any'
            value={this.props.timeElapsed}
            onMouseUp={this.props.handleSeekMouseUp}
            onMouseDown={this.props.handleSeekMouseDown}
            onChange={this.handleSeekChange} 
          />
        </div>

        <div className="section">
          
        </div>

      </div>
    );
  }
}

export default Controls;
