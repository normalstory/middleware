//로거 : 비동기 작업을 모니터링, 관리하기 위한 라이브러리 
//thunk : 특정작업을 함수로 감싼 상태, 작업의 '시점을 정하여 실행'할 수 있다
//디스패치(액션) : 컴포넌트가 자신이 가지고 있는 '액션'을 '리듀서에게' 리덕스 스토어에 업데이트 할 것을 '요청'하는 것   
//*https://velopert.com/3528

import { applyMiddleware, createStore } from 'redux';
import modules from './modules';

//import loggerMiddleware from './lib/loggerMiddleware'  // <-자작용 예시
import {createLogger} from 'redux-logger';  //리덕스 제공 로거 
import ReduxThunk from 'redux-thunk'; //리덕스 청크 : (ex.counter.js) '함수'를 디스패치할 수 있게 한다


const logger = createLogger();
const store = createStore(modules, applyMiddleware(logger, ReduxThunk));

export default store;