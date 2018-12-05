import { SEARCH_VIDEO , IS_LOADING, CLOSE_VIDEO_PLAYER, OPEN_VIDEO_PLAYER } from '../action-types';

export function searchVideo(keyword){
  return {
    type: SEARCH_VIDEO,
    payload: {
      query: keyword
    }
  };
}

export function isLoading(value) {
  return {
    type: IS_LOADING,
    payload: {
      value
    }
  }
}

export function closeVideoPlayer() {
  return {
    type: CLOSE_VIDEO_PLAYER,
    payload: {
      value: false
    }
  }
}

export function openVideoPlayer(src) {
  return {
    type: OPEN_VIDEO_PLAYER,
    payload: {
      value: true,
      src
    }
  }
}

export function searchVideoOnApi(keyword){
  return (dispatch) => {
    /*
    here do any API call since we do not have API use set timeout
    fetch().then(() => { dispatch(searchVideo(keyword); })
    */
    dispatch(isLoading(true))

    setTimeout(() => {
      dispatch(isLoading(false))
      dispatch(searchVideo(keyword))
    }, 1000)
  }
}

/**
To export more actions add new funcions like the below one with the
export key

export function myFunction(keyword){
  return {
    type: 'SEARCH_VIDEO',
    payload: {
      query: keyword
    }
  };
}

*/
