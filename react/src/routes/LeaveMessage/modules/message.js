import fetch from 'isomorphic-fetch'
import trueUrl from '../../commonData'

const HANDLE_CHANGE='HANDLE_CHANGE'
const HANDLE_CLICK='HANDLE_CLICK'
const RECEIVE_MESSAGE='RECEIVE_MESSAGE'
const REQUEST_MESSAGE='REQUEST_MESSAGE'
const INIT='INIT'
const HANDLE_CLEARCLICK = "HANDLE_CLEARCLICK"

      var userName=localStorage.getItem('userId'),
        gameId=localStorage.getItem('gameId'),
        baseUrl=trueUrl.trueUrl;


function requestMessage(){
  return{
    type:REQUEST_MESSAGE
  }
}

 const receiveMessage=(value)=>({
  type:RECEIVE_MESSAGE,
  payload:value
})

 function handleChange(e){
  var c;
  if(e.target.value){
    c=true
  }else{
    c=false
  }
  return{
    type:HANDLE_CHANGE,
    payload:e.target.value,
    color:c,
  }
}

 function handleClearClick(){
  return{
    type:HANDLE_CLEARCLICK
  }
    
}

//让滚动条随时跟进到最底端

function updatedUl(){
  var ul = document.querySelector('ul');
  if(ul){
    ul.scrollTop=ul.scrollHeight;
  }
 
}

 function init (){

    return (dispatch,getState)=>{
      let url=baseUrl+'challenge/game/getChallengeLeaveMessage.do?'
     url +="gameId="+gameId
    return fetch(url)
        .then(response=>response.json())
       .then(json =>{
         dispatch(receiveMessage(json.values))
         dispatch(handleClearClick())
          updatedUl()
        })
    }
}
//updata something function
 function  handleClick(){
    return (dispatch,getState)=>{
          var value = getState().dataMessage.sayValue;
        if(value){
     let url=baseUrl+'challenge/game/addChallengeLeaveMessage.do?'
     url +="gameId="+gameId+"&content="+value+"&userName="+userName
         return fetch(url)
         .then(response=>response.json())
         .then(json =>{
          dispatch(init())
        })
        }
    }
}
export const actions={
    handleChange,
    handleClick,
    handleClearClick,
    init,
}  

const ACTION_HANDLERS={
  [REQUEST_MESSAGE]: (state) => {
    return ({...state,changeColor:false,fetching:false})
  },
  [RECEIVE_MESSAGE]: (state, action) => {
    return ({...state,fetching:true, messageList:action.payload})
  },
    [HANDLE_CLEARCLICK ]: (state) => {
    return ({...state, sayValue: "",changeColor:false})
  },
  [HANDLE_CHANGE]:(state,action)=>{
    return ({...state,sayValue:action.payload,changeColor:action.color})
  }

}

const initialState = {
    messageList:[],
    sayValue:"",
    changeColor:false,
    fetching:false
}

export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}