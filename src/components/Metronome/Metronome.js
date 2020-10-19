import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from "prop-types";
import "./Metronome.css"
import playSound from "../../libs/simpleTones";

/*
* https://codedaily.io/tutorials/22/The-Shapes-of-React-Native
* https://awesomeopensource.com/project/escottalexander/simpleTones.js?fbclid=IwAR2jBhp7wiG-tC7-4ufZe2Ec3HY7qBg5fwbait9xAXo78j9dJt108GQWRCs
*/

class Metronome extends React.Component {

  static propTypes = {
    bpm: PropTypes.number,
  };

  constructor(props){
      super(props);
      this.state={
        play: false
      };
      this.partBPM="";
  }

  handleClickPlus = ()=> {
    this.props.clickPlus();
  }

  handleClickMinus= ()=> {
    this.props.clickMinus();
  }

  handleChange = (event) => {
    if(event.target.value>0 && event.target.value<300){
      var newBPM = parseInt(event.target.value);
      this.props.changeInput(newBPM);
    }
  }

  startBit = () =>{
    this.state.play = !this.state.play;
    if(this.state.play){
      this.makeBit();
    }
  }

  makeBit = () =>{
    if (this.state.play) {
      var lapse=(1000*60)/this.props.bpm;
      playSound("square", 5, 0.2, 5, 0.1);
      setTimeout(() => {  this.makeBit(); }, lapse);
    }
  }

  render() {
    return (
      <div className="metronome">
        <Button id="metronome-icon" variant="outlined" onClick={this.startBit} startIcon={<Avatar id="metronome-avatar" src={'https://png.pngtree.com/png-vector/20190928/ourmid/pngtree-classic-metronome-icon-cartoon-style-png-image_1753285.jpg'} />} />
        {/* <button id="picture" onClick={this.startBit}></button> */}

        <Button variant="outlined" onClick={this.handleClickMinus}>
          <RemoveIcon />
        </Button>
        {/* <button id="minus" onClick={this.handleClickMinus}></button> */}
        
        <OutlinedInput id="metrInput" type="int" onChange={this.handleChange} value={this.props.bpm} />
        {/* <input id="metrInput" type="int" onChange={this.handleChange} value={this.props.bpm}/> */}

        <Button variant="outlined" onClick={this.handleClickPlus}>
          <AddIcon />
        </Button>
        {/* <button id="plus" onClick={this.handleClickPlus}></button> */}
      </div>
    );
  }
}


export default Metronome;