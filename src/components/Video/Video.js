import React from 'react';
import ReactPlayer from 'react-player'
import PropTypes from "prop-types";
import './Video.css';

/*
* https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0200332
*/

class Video extends React.Component {

  static propTypes = {
    url: PropTypes.string,
  };

  render() {
    return (
      <div className='component-video'>
        <ReactPlayer url={this.props.url} width='100%' height='100%'/>
      </div>
    );
  }
}

export default Video;
