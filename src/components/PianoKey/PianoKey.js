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
*/

class PianoKey extends React.Component {
  
  static propTypes = {
    note: PropTypes.string,
    keyboardLetter: PropTypes.string,
    blackKey: PropTypes.bool,
    //wide: PropTypes.bool,
    clickHandler: PropTypes.func,
  };

  handleClick = () => {
    this.props.clickHandler(this.props.note);
  };

  render() {
    const className = [
      "component-button",
      this.props.blackKey ? "black" : "",
    ];

    return (
      <div className={className.join(" ")}>
        <button onClick={this.handleClick}>{this.props.note}</button>
      </div>
    );
  }
}

export default PianoKey;
