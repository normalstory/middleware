import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
//import axios from 'axios'; //post.js로 대체
import * as postActons from './modules/post';


class App extends Component {
    // componentDidMount(){
    //     axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
    //     .then(response => console.log(response));
    // } //post.js로 대체, 아래 incrementAsync도 increment로 복귀   

    // loadData = () =>{
    //     const {PostActions, number} = this.props;
    //     PostActions.getPost(number) //여기app의 속성(숫자)를 담아서 post에 있는 getPost실행 
    //
    //     //요청완료후 추가 작업 실행이 필요한 경우(방법 1) 
    //     .then(
    //         (response)=>{
    //             console.log(response);
    //         }
    //     ).catch(
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }
    
    //**redux-pender로 promise기반 액션에 대한 요청취소 01
    cancelRequest = null
    handleCancel = () => {
        if(this.cancelRequest){
            this.cancelRequest();
            this.cancelRequest = null;
        }
    }

    //요청완료후 추가 작업 실행이 필요한 경우(방법 2 : try,catch)
    loadData = async () =>{  //함수 앞에 async 키워드 
        const {PostActions, number} = this.props;
        try {
            const p =PostActions.getPost(number);
            this.cancelRequest = p.cancel;
            //액션에 대한 요청취소 02  const response = await PostActions.getPost(number); //사용시 변술 담아 사용\
            const response = await p;
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount(){
        this.loadData(); //(1/2), 실행될 때마다 기본으로 동작시킴 
        //액션에 대한 요청취소 03
        window.addEventListener('keyup', (e)=>{
            if(e.key === 'Escape'){
                this.handleCancel();//그리고 이때 특정작업을 하고 싶다면 post에서 onCancel함수 추가
            }
        })//if true라면, DidUpdate되기 전에 실행 
    }
    componentDidUpdate(prevProp, prevState){
        if(this.props.number !== prevProp.number){ //(2/2), 이전 숫자와 지금 숫자가 달라도 getPost실행 
            this.loadData();
        }
    }


    render() {
        const { CounterActions,number  ,post,error,loading} = this.props; //이제 post결과물 랜더링,을 위한 속성 추가

        return (
            <div>
                <h1>{number}</h1>
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
                {
                    (() => {
                        if(loading)
                            return (<h2>로딩 중..</h2>);
                        if(error)
                            return (<h2>오류 발생..</h2>);
                        return(
                            <div>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>
                        )
                    })()
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.data,
        //loading: state.post.pending
        //error: state.post.error
        loading: state.pender.pending['GET_POST'], //['GET_POST'] 추가 <- applyPenders에서 배열로 넣으니까 
        error: state.pender.failure['GET_POST']
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActons, dispatch)
    })
)(App);