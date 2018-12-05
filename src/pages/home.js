import React, { Component } from 'react';
import VideoItems from '../components/ui/results/videoItems';
import VideoPlayer from '../components/containers/videoPlayer';
import { connect } from 'react-redux';
import { List as list } from 'immutable';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';

class Home extends Component {
  handleClick = e => {
    let video = this.props.search.find(item =>  item.get('id') === e.target.getAttribute('item-id'));
    this.props.actions.openVideoPlayer(video.get('src'));
  }

  handleSubmit = e => {
    e.preventDefault();

    // without bindActionCreators -> this.props.dispatch(searchVideo(e.target.querySelector('input').value));
    // non asyncronus this.props.actions.searchVideo(e.target.querySelector('input').value);
    this.props.actions.searchVideoOnApi(e.target.querySelector('input').value);
  }

  render(){
    return (
      <div className="product-list">
        <form action="POST" onSubmit={this.handleSubmit}>
          <input type="text" />
        </form>

        { this.props.videoPlayerOpen && <VideoPlayer videoSrc={this.props.videoSrc} /> }

        { this.props.loading ? <div> Loading... </div> : <VideoItems handleClick={this.handleClick} search={this.props.search} /> }
      </div>
    );
  }

  componentWillMount(){
	}

  componentDidMount(){
    let id = this.props.match.params.id;

    if(id){
      let video = this.props.search.find(item =>  item.get('id') === id);
      this.props.actions.openVideoPlayer(video.get('src'));
    } else {
      this.props.actions.closeVideoPlayer();
    }
	}


	componentWillReceiveProps(){
	  //component recieve new props
	}

	shouldComponentUpdate(){
    return true;
	}
	componentWillUpdate(){

	}

	componentDidUpdate(){
    let id = this.props.match.params.id;
    if(!id) this.props.actions.closeVideoPlayer();

	}
	componentWillUnmount(){

	}
	componentDidCatch(){
	// catch any error
	}
}


function mapStateToProps(state, props){
  const isloading = state.get('loading').get('state');
  const videoPlayerOpen = state.get('videoPlayer').get('state');
  const videoSrc = state.get('videoPlayer').get('src');

  let searchResult = list();
  const search = state.get('data').get('search');
  const mediaList = state.get('data').get('entities').get('media');

  if(search){

    searchResult = mediaList
      .filter(item => item.get('author').toLowerCase().includes(search.toLowerCase()))
      .toList();
  } else {
    searchResult = mediaList.toList();
  }

  return {
    search: searchResult,
    loading: isloading,
    videoPlayerOpen,
    videoSrc
  }
}

/*
this guy below is used to avoid use the this.props.dispatch( in the handleSubmit
method

the old way is :
this.props.dispatch(searchVideo(e.target.querySelector('input').value));
*/

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
