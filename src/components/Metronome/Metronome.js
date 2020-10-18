import React from 'react';
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
            var newBPM=parseInt(event.target.value);
            this.props.changeInput(newBPM);
        }
  }

  startBit = () =>{
      this.state.play=!this.state.play;
      if(this.state.play){
        this.makeBit();
      }
  }

  makeBit = () =>{
    if(this.state.play){
        var lapse=(1000*60)/this.props.bpm;
        playSound("square", 5, 0.2, 5, 0.1);
        setTimeout(() => {  this.makeBit(); }, lapse);
    }
  }

  render() {
    //const className = this.props.blackKey ? "component-key black" : "component-key";
    return (
      <div className="Component-Metronome">
        <div>
            <button id="picture" onClick={this.startBit}></button>
        </div>
        <div>
            <button id="plus" onClick={this.handleClickPlus}></button>
            <br/>
            <input id="metrInput" type="int" onChange={this.handleChange} value={this.props.bpm}/>
            <br/>
            <button id="minus" onClick={this.handleClickMinus}></button>
        </div>
      </div>
    );
  }
}


export default Metronome;