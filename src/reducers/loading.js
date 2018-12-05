import schema from '../schemas';
import {fromJS} from 'immutable';
import { IS_LOADING } from '../action-types';

const initialState = fromJS({
  state: false
});

function loading(state = initialState, action){
  switch (action.type) {
    case IS_LOADING: {
      return state.set('state', action.payload.value);
    }
    default:
      return state;
  }
}

export default loading;
