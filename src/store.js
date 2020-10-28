//로거 : 비동기 작업을 모니터링, 관리하기 위한 라이브러리 
//thunk : 특정작업을 함수로 감싼 상태, 작업의 '시점을 정하여 실행'할 수 있다
//디스패치(액션) : 컴포넌트가 자신이 가지고 있는 '액션'을 '리듀서에게' 리덕스 스토어에 업데이트 할 것을 '요청'하는 것   
//*https://velopert.com/3528

//redux-pender 미들웨어, 프로미스기반, (설정은 store, index)(구현은 post )
//특징 1) pender 내부에는 요청을 관리하는 reducer와 action을 처리하는 handler 함수를 자동으로 만드는 도구도 들어 있다.  
//특징 2) flux표준을 따르기 때문에 createAction로 액션 생성, promise반환이 가능 
//사용) action객체 안의 payload가 promise형태(then, catch)라면 시작전완료실패시 뒤에 PENDING,SUCCESS,FAILURE를 접미사로 붙여주면 

import { applyMiddleware, createStore } from 'redux';
import modules from './modules';

//import loggerMiddleware from './lib/loggerMiddleware'  // <-자작용 예시
import {createLogger} from 'redux-logger';  //리덕스 제공 로거 
//import ReduxThunk from 'redux-thunk'; //리덕스 청크 : (ex.counter.js) '함수'를 디스패치할 수 있게 한다
import penderMiddleware from 'redux-pender'; //미들웨어 변경 01

const logger = createLogger();
const store = createStore(modules, applyMiddleware(logger, penderMiddleware())); //미들웨어 변경 02 , index에 '속성'에도 추가 

export default store;