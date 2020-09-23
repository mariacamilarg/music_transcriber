import React from 'react';
import PropTypes from "prop-types";
import "./PianoKey.css";

/* 
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
* https://theremin.app/
* https://virtualpiano.net/
* https://codepen.io/ayjsheng/pen/WNeyZLB
* https://github.com/otanim/virtual-piano
* https://ourcodeworld.com/articles/read/293/rendering-music-notation-music-sheet-in-javascript-with-vexflow-2
* https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
* https://github.com/GermaVinsmoke/bmi-calculator/tree/master/src
* https://github.com/ahfarmer/calculator/tree/master/src/component
--
* Vex flow https://github.com/markacola/react-vexflow/blob/master/src/index.js
*/

class PianoKey extends React.Component {
  
  static propTypes = {
    note: PropTypes.string,
    keyboardLetter: PropTypes.string,
    hasSharpKey: PropTypes.bool,
    clickHandler: PropTypes.func,
  };

  handleClick = () => {
    this.props.clickHandler(this.props.note);
  };

  handleClickSharp = () => {
    this.props.clickHandler(this.props.note + "#");
  };

  render() {
    //const className = this.props.blackKey ? "component-key black" : "component-key";
    return (
      <div className="component-key">
        <button className="white" onClick={this.handleClick}>
          {this.props.note}
        </button>
        { 
          this.props.hasSharpKey && 
          <button className="black" onClick={this.handleClickSharp}>
            {this.props.note + "#"}
          </button> 
        }
      </div>
    );
  }
}

export default PianoKey;
