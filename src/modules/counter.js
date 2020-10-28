import { handleActions, createAction } from 'redux-actions';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);


//스토어에 있는 리덕스 청크 활용 코드  : 함수를 디스패치하는 것 , 이 코드 작성 후  'app에 ~Async를 붙여준다!!!'
export const incrementAsync = () => dispatch => {
    setTimeout(
        () => { dispatch(increment())}, 1000
    )
}
export const decrementAsync = () => dispatch => {
    setTimeout(
        () => { dispatch(decrement())}, 1000
    )
}


export default handleActions({
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
}, 1); //초기값을 0에서 1로 변경, postId 에러 방지를 위해