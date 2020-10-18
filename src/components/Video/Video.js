import React from 'react';
import ReactPlayer from 'react-player'
import PropTypes from "prop-types";
import './Video.css';

/*
* https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0200332
* https://github.com/CookPete/react-player
* https://github.com/CookPete/react-player/blob/master/src/demo/App.js
* https://cookpete.com/react-player/
*/

class Video extends React.Component {

  static propTypes = {
    url: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      enteredUrl: this.props.url,
      videoUrl: this.props.url,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({
      enteredUrl: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      videoUrl: this.state.enteredUrl
    });
  }

  render() {
    return (
      <div className='component-video'>
        <form className='search-video' onSubmit={this.handleSubmit}>
          <label>
            <input className='search-bar' type="text" value={this.state.enteredUrl} onChange={this.handleChange} />
          </label>
          <input className='search-button' type="submit" value="OK" />
        </form>
        <ReactPlayer url={this.state.videoUrl} width='100%' height='85%'/>
      </div>
    );
  }
}

export default Video;
