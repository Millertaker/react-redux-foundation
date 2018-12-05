import schema from '../schemas';
import {fromJS} from 'immutable';
import { CLOSE_VIDEO_PLAYER, OPEN_VIDEO_PLAYER } from '../action-types';

const initialState = fromJS({
  state: false,
  src: ''
});

function videoPlayer(state = initialState, action){
  switch (action.type) {
    case CLOSE_VIDEO_PLAYER: {
      return state.set('state', action.payload.value);
    }
    case OPEN_VIDEO_PLAYER: {
      return state.merge({
        state: true,
        src: action.payload.src,
      });
    }
    default:
      return state;
  }
}

export default videoPlayer;
