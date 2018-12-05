import data from './data';
import loading from './loading';
import videoPlayer from './videoPlayer';
import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers({
  data,
  loading,
  videoPlayer,
});

export default rootReducer;
