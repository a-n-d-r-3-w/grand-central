import { combineReducers } from 'redux';
import { aboutOthersReducer } from './AboutOthers/aboutOthersReducer';

export const grandCentralReducer = combineReducers({
  aboutOthersReducer
});
