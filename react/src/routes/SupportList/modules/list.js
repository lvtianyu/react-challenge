import fetch from 'isomorphic-fetch'
import trueUrl from '../../commonData'
const RECEIVE_LIST = 'RECEIVE_LIST'
const REQUEST_LIST = 'REQUEST_LIST'
const HANDLE_LIST = 'HANDLE_LLIST'
const SHOW_NOTIFIC = 'SHOW_NOTIFIC '
const HANDLE_UPTOP='HANDLE_UPTOP'

    var 
        gameId=localStorage.getItem('gameId'),
        baseUrl=trueUrl.trueUrl;


 function handleUpTop(value) {
        return{
            type:"HANDLE_UPTOP",
            upShow:value,
        }
}

export function  handleTop(value){

        return (dispatch,getState)=>{
            dispatch(handleUpTop(value))
        }
}


function requestList (){
    return {
        type:REQUEST_LIST
    }
}

export const receiveList = (value)=>({
    type:RECEIVE_LIST,
    payload:value
})
export const handleList =(value)=>({
    type:HANDLE_LIST,
    show:value
})

export const showNotific = (value)=>({
    type:SHOW_NOTIFIC ,
    notific:value
})
var baseHeight=window.innerHeight,containerHeight,pageIndex=1,pageCount,scrollAddHeight;
//用来判断整个滑动的逻辑的方法
export function handleWheelList(value) {
            baseHeight=baseHeight+(~value) //基本高度（屏幕的高度）加上向下滑动的值
            scrollAddHeight=document.body.scrollTop
    return (dispatch,getState)=>{
        //判断是否进行请求加载，向下滑动，滑动累计值大于容器高度
        if(value<0){
             baseHeight=baseHeight>containerHeight+50?containerHeight:baseHeight

            if(baseHeight>=(containerHeight)){

                dispatch(handleList(true))
                //减少请求次数，pageindex和总页数进行对比够数不请求

                pageIndex++
                if(pageIndex<=pageCount){
                      publicAjax(dispatch) 

                }else{
                dispatch(showNotific(true))
                }
                dispatch(handleList(false))
            }
            dispatch(handleUpTop(false))
                                // console.log(2)

        }else{
            //基本值不能小于屏幕高
         baseHeight=baseHeight<window.innerHeight?window.innerHeight:baseHeight
            if(scrollAddHeight){
                                    dispatch(handleUpTop(true))

                    }else{
                                    dispatch(handleUpTop(false))

                    }
        }

    }
}
export function init(){
    return (dispatch,getState)=>{
        return publicAjax(dispatch) 
    }
}

function publicAjax(dispatch) {
          let url=baseUrl+'challenge/game/getChellengeClickPraise.do?'
     url +="gameId="+gameId+"&pageIndex="+pageIndex
    fetch(url)
        .then(response=>response.json())
      .then(json =>{

         dispatch(receiveList(json.values.list))
         pageCount=json.values.pageCount//如果页数不为0就计算容器的高度
         if(!pageCount){
            // dispatch(showNotific(true))
         }else{
         containerHeight=document.querySelector('ul').offsetHeight //容器高度
         }
         

      })
}

// export const actions={
//     init,
//     requestList,
//     receiveList,
//     handleWheelList,
//     handleTop,
//     handleUpTop,
    
// }  

const ACTION_HANDLERS={
  [REQUEST_LIST]: (state) => {
    return ({...state,fetching:false})
  },
  [RECEIVE_LIST]: (state, action) => {
    return ({...state,fetching:true, supportList: state.supportList.concat(action.payload)})
  },
  [SHOW_NOTIFIC]:(state, action)=>{
    return ({...state,isBelow:action.notific})

  },
  [HANDLE_UPTOP]:(state,action)=>{
      return({...state,upShow:action.upShow,upTop:action.upTop})
  }
}
const initialState = {
supportList:[],
fetching:false,
isBelow:false,//false时候是等待加载，true时候是加载完毕
upShow:false,
}
export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
      return handler ? handler(state, action) : state
}