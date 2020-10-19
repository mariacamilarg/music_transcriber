import React from 'react';
import Slider from '@material-ui/core/Slider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Metronome from '../Metronome/Metronome';
import PropTypes from "prop-types";
import "./Controls.css";

/*
* https://material-ui.com/components/material-icons/
*
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
    playing: PropTypes.bool,
    speed: PropTypes.number,
    volume: PropTypes.number,
    timeElapsed: PropTypes.number,
    handleSeekMouseUp: PropTypes.func,
    handleVolumeChange: PropTypes.func,
  };

  constructor(props) {
    super(props)
    this.state = {
      playPause: "pause",
    };
    this.handleSeekChange=this.handleSeekChange.bind(this);
    this.handleVolumeChange=this.handleVolumeChange.bind(this);
    this.handleSpeedChange=this.handleSpeedChange.bind(this);
    this.handlePlayPause=this.handlePlayPause.bind(this);
  };

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

  handlePlayPause = (event, newPlayPause) => {
    if (newPlayPause === "pause" && this.props.playing) {
      this.props.pause();
    } else if (newPlayPause === "play" && !this.props.playing) {
      this.props.play();
    }
  };

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
          {/* <Slider 
            min={0} 
            max={1}
            value={this.props.volume}
            onChange={this.handleVolumeChange}
            aria-labelledby="continuous-slider" 
          /> */}
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
          <ToggleButtonGroup
            value={this.props.playing ? "play" : "pause"}
            exclusive
            onChange={this.handlePlayPause}
            aria-label="text alignment"
          >
            <ToggleButton value="play" aria-label="centered">
              <PlayArrowIcon />
            </ToggleButton>
            <ToggleButton value="pause" aria-label="centered">
              <PauseIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

      </div>
    );
  }
}

export default Controls;
