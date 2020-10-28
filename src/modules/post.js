import {handleActions, createAction} from 'redux-actions';
import axios from 'axios';

//promise
function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}
//postId를 넣은 결과에 대한 액션타입, (모듈 1/3)
const GET_POST_PENDING ='GET_POST_PENDING'; //요청중 
const GET_POST_SUCCESS ='GET_POST_SUCCESS'; //성공 
const GET_POST_FAILURE ='GET_POST_FAILURE'; //실패 
//postId를 넣은 결과에 대한 액션함수, 여기서만 사용하는 거라 별도 export는 안함, (모듈 2/3)
const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

//thunk, getPost 이건 컴포넌트에서 사용할 수 있도록 export, (모듈 2/3) 
export const getPost = (postId) => dispatch => {
    dispatch(getPostPending());
    return getPostAPI(postId).then((response) =>{ //promise기반인 axios를 promise구조(then, catch)로 return(반환)해야 나중에 컴포넌트 호출시 getPost().then() 가능 
        dispatch(getPostSuccess(response)) //성공시 '응답' 내용을 payload로 설정하여 success를 디스패치 
        return response;
    }).catch(error =>{
        dispatch(getPostFailure(error));   //실패시 '에러' 내용을 payload로 설정하여 failuer를 디스패치 
        throw(error); //한번 더 catch를 실행하기 위해 error를 throw 
    })
}

const initialState = { //(모듈 3/3)
    pendeing : false,
    error : false,
    data : {
        title:'',
        body:''
    }
}

export default handleActions({   //(모듈 3/3)
    [getPostPending] : (state, action) => {
        return {
            ...state,
            pendeing : true,
            error : false
        }
    },
    [getPostSuccess] : (state, action) => {
        const {title, body} = action.payload.data;
        return {
            ...state,
            pendeing : false,
            data : {
                title,
                body
            }
        }
    },
    [getPostFailure] : (state, action) => {
        return {
            ...state,
            pendeing : false,
            error : true
        }
    }
}, initialState);

//모듈 작성 후, 이 모듈의 리듀서를 루트 리듀서(ex src/index.js)에 등록 