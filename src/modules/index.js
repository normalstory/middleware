import { combineReducers } from 'redux';
import counter from './counter';
import post from './post';

import {penderReducer} from 'redux-pender'; //미들웨어 변경 03

export default combineReducers({
    counter,
    post,
    pender:penderReducer //미들웨어 변경 04
});