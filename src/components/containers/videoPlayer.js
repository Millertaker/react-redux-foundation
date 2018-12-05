import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class VideoPlayer extends Component {
  handleClose = e => {
    this.props.actions.closeVideoPlayer();
  }

  render(){
    return(
      <div className="videoContainer">
        <div className="overlay">
        </div>
        <div className="videoPlayer">
          <Link to="/" >
            <span className="videoPlayer__close-video" onClick={this.handleClose} href="">X</span>
          </Link>

          <video autoPlay controls width="320" height="180" controls>
            <source src={this.props.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(VideoPlayer);
