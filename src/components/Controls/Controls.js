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
    speed: PropTypes.number,
    volume: PropTypes.number,
    timeElapsed: PropTypes.number,
    handleSeekMouseUp: PropTypes.func,
    handleVolumeChange: PropTypes.func,
  };

  constructor(props) {
		super(props)
    this.handleSeekChange=this.handleSeekChange.bind(this);
    this.handleVolumeChange=this.handleVolumeChange.bind(this);
    this.handleSpeedChange=this.handleSpeedChange.bind(this);
  }

  parseSeconds(timeElapsed) {
    var dummyDate = new Date(0);
    dummyDate.setSeconds(timeElapsed * this.props.duration);
    return dummyDate.toISOString().substr(11, 8);
  }

  handleVolumeChange(event) {
    this.props.handleVolumeChange(event);
  }

  handleSpeedChange(event) {
    this.props.handleSpeedChange(event);
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
          <label>Speed: </label>
          <span>{this.props.speed.toFixed(2)}x</span>
          <br/>
          <input 
            type='range' min={0.25} max={2.0} step={0.25} 
            value={this.props.speed} 
            onChange={this.handleSpeedChange} 
          />
        </div>
        
        <div className="section">
          <label>Volume: </label>
          <span>{this.props.volume.toFixed(2)*100}% </span>
          <br/>
          <input 
            type='range' min={0} max={1} step='any' 
            value={this.props.volume} 
            onChange={this.handleVolumeChange} 
          />
        </div>

        <div className="section">
          <label>Seek: </label>
          <span>{this.parseSeconds(this.props.timeElapsed)}</span>
          <br/>
          <input
            type='range' min={0} max={0.999999} step='any'
            value={this.props.timeElapsed}
            onMouseUp={this.props.handleSeekMouseUp}
            onMouseDown={this.props.handleSeekMouseDown}
            onChange={this.handleSeekChange} 
          />
        </div>

        <div className="section">
          <button onClick={this.props.play}>Play</button>
          <button onClick={this.props.pause}>Pause</button>
        </div>

      </div>
    );
  }
}

export default Controls;
