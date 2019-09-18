import {combineReducers} from 'redux';
import auth from './AuthReducer';
import result from './ResultReducer';


const reducers = combineReducers({
  auth,
  result,
});

export default reducers;
