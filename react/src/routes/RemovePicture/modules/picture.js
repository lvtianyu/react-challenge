import fetch from 'isomorphic-fetch'

const RECEIVE_ZEN = 'RECEIVE_ZEN'
const REQUEST_ZEN = 'REQUEST_ZEN'
const ACTIVE ='ACTIVE'

var countForTransformShow = 0;
var mostlong = 0
var pictureListObj=[];//保存数组
var userName="X9T7P2EI",
        gameId="111",
        baseUrl="http://camp.liver-cloud.com/challenge/";

function requestZen () {
  return {
    type: REQUEST_ZEN
  }
}

 const receiveZen = (value) => ({
  type: RECEIVE_ZEN,
  payload:value
})
//数组删除
function deleteArray(a,i){
  var b = new Set(a);
  b.delete(a[i])
  return Array.from(b)
}

 function handleClick(){
      return (dispatch,getState)=>{
        var pictureId ;
        if(pictureListObj.length>0){
            pictureId=pictureListObj[countForTransformShow].id;
            pictureListObj=deleteArray(pictureListObj,countForTransformShow)
            mostlong=pictureListObj.length-1;
            countForTransformShow--
            dispatch(requestZen())

        return fetch('http://camp.liver-cloud.com/challenge/challenge/game/deletePicture.do?pictureId='+pictureId)
            .then(response=>response.json())
            .then(json =>{

              if(mostlong>=0){
                countForTransformShow=countForTransformShow<0?0:countForTransformShow
                 dispatch(active(countForTransformShow))
              }
                         dispatch(receiveZen(pictureListObj))
            })
        }
    }
}


 function active(value){
  var pre=true,next=true;
  if(value>=mostlong){
    value=countForTransformShow=mostlong
    pre=false
  }else if(value<=0){
    next=false
    value=countForTransformShow=0
  }

  return{
    type:'ACTIVE',
    style:value,
    pre:pre,
    next:next,
    leftOrRight:true
  }
}

 function  init(){
    return (dispatch,getState)=>{
           let url=baseUrl+'challenge/game/getChallengeInformation.do?'
     url +="gameId="+gameId+"&userName="+userName
    return fetch(url)
        .then(response=>response.json())
        .then(json =>{
          pictureListObj=json.values.pictureUrl
        mostlong=pictureListObj.length-1;
              dispatch(receiveZen(pictureListObj))
        })
    }
}

 function handleClickNext(){

  return (dispatch,getState)=>{
        if(getState().message.pre){
            countForTransformShow++
            // console.log(countForTransformShow)
         dispatch(active(countForTransformShow))
        }
  }
}

 function handleClickPre(){
  
  return (dispatch,getState)=>{
    if(getState().message.next){
        countForTransformShow--
         dispatch(active(countForTransformShow))
        }
  }
}

export const actions={
    init,
    requestZen,
    receiveZen,
    handleClick,
    handleClickNext,
    handleClickPre,
}            

const ACTION_HANDLERS={
  [REQUEST_ZEN]: (state) => {
    return ({...state,fetching:false,})
  },
  [RECEIVE_ZEN]: (state, action) => {
    return ({...state, pictureList: action.payload,fetching:true})
  },
  [ACTIVE]: (state,action) => {
    return ({...state,transformShow:action.style,pre:action.pre,
      next:action.next,leftOrRight:action.leftOrRight})
  },
}


const initialState = {
    pictureList:[],
    transformShow:0,
    leftOrRight:false,
    fetching:false,
    pre:true,
    next:false,
}
export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}