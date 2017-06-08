import trueUrl from '../../commonData'
import Format from '../../../components/publick'
const RECEIVE_ZEN = 'RECEIVE_ZEN'
const REQUEST_ZEN = 'REQUEST_ZEN'
const HANDLE_CHANGE='HANDLE_CHANGE'
const HANDLE_TEXTAREA='HANDLE_TEXTAREA'

 var userName=localStorage.getItem('userId'),
        checkerName=userName,
        gameId=localStorage.getItem('gameId'),
        date=new Date(localStorage.getItem('challengeDate')).Format("yyyy-MM-dd hh:mm:ss"),
        baseUrl=trueUrl.trueUrl;


function requestZen () {
  return {
    type: REQUEST_ZEN
  }
}

 const receiveZen = (value) => ({
  type: RECEIVE_ZEN,
  payload: value
})

function ajaxOk(value){
  if(value!="ok"){
    return
  }else{
    return
  }
}

 function init () {
  return (dispatch, getState) => {
    let url=baseUrl+'challenge/game/getChallengeInformation.do?'
     url +="userName="+userName+"&date="+date+"&gameId="+gameId+"&checkerName="+checkerName
    return fetch(url)
        .then(response=>response.json())
       .then(json =>{
          if(json.result=="ok"){
           var goleWidth=(json.values.goleCalorie/json.values.finalCalorie)*100+'%'
           var addWidth=(json.values.addCalorie/json.values.finalCalorie)*100+'%'
           var a={
               calorieSum:json.values.finalCalorie,
               addCalorie:json.values.addCalorie,
               goleCalorie:json.values.goleCalorie,
               goleWidth:goleWidth,
               addWidth:addWidth
            }
             dispatch(receiveZen(a))
           }else{
             alert(json.errormsg)
           }

        })
  }
}

 function handleChange(e){
  return{
    type:HANDLE_CHANGE,
    payload:e.target.value,
  }
}

 function  updatedResult(){
    return (dispatch,getState)=>{
          var realityCompleteCalorie = getState().data.finialCalorie;
          var challengeEndDescribe=getState().data.describeValue
        if(realityCompleteCalorie){
           let url=baseUrl+'challenge/game/uploadChallengeData.do?'
     url +="realityCompleteCalorie="+realityCompleteCalorie+"&challengeEndDescribe="+challengeEndDescribe+"&gameId="+gameId;
         return fetch(url)
         .then(response=>response.json())
         .then(json =>{
           if(json.result=="ok"){
             let finishShow=json.values==0?true:false;
              localStorage.setItem("finishShow",finishShow)
              location.replace("http://10.0.1.37:8080/finishShow")
                      
           }else{
             alert(json.errormsg)
           }

          })
        }
    }
}

 function handleTextarea(e) {
  var value=e.target.value
    value=value.replace(/[\\\/:\*\?"\<\>\|]/g,"")

  return{
    type:HANDLE_TEXTAREA,
    textareaValue:value,
  }
}
//不用单独暴漏方法名，统一给actions在modules／challenge中付值给mapDispatchtoProps
export const actions = {
  requestZen,
  receiveZen,
  init,
  handleChange,
  handleTextarea,
  updatedResult
}

const ACTION_HANDLERS = {
  [REQUEST_ZEN]: (state) => {
    return ({...state, fetching: false})
  },
  [RECEIVE_ZEN]: (state, action) => {
    return ({...state, fetching: true, showCalorie: action.payload})
  },
  [HANDLE_CHANGE]:(state,action)=>{
    return ({...state,finialCalorie:action.payload,})
  },
  [HANDLE_TEXTAREA]:(state,action)=>{
    return ({...state,describeValue:action.textareaValue,})
  }
}

const initialState = {
  fetching: false,
  showCalorie:{}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}