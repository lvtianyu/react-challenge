import fetch from 'isomorphic-fetch'
import trueUrl from '../../commonData'

const RECEIVE_DETAIL="RECEIVE_DETAIL"
const REQUEST_DETAIL="REQUEST_DETAIL"

        var userName=localStorage.getItem('userId'),
        gameId=localStorage.getItem('gameId'),
        baseUrl=trueUrl.trueUrl;



function requestDetail(){
    return {
        type:REQUEST_DETAIL
    }
}

export const receiveDetail=(value)=>({
    type:RECEIVE_DETAIL,
    payload:value.redpacketList,
    userRedpacketSum:value.userRedpacketSum,
    headPortrait:value.gameUserInfo.headPortrait,
    nickname:value.gameUserInfo.nickname,

})

export function init (){

    return (dispatch,getState)=>{
         let url='http://camp.liver-cloud.com/platform/livercloud/v1/redpacket/getRedMessage.do?'
            url +="userName="+userName+"&gameId="+gameId
    return fetch(url)
        .then(response=>response.json())
       .then(json =>{
         dispatch(receiveDetail(json.values))
        })
    }
}

// export const actions={
//     init,
// }  

const ACTION_HANDLERS={
  [REQUEST_DETAIL]: (state) => {
    return ({...state,fetching:true})
  },
  [RECEIVE_DETAIL]: (state, action) => {
    return ({...state,fetching:true, 
        detailList:state.detailList.concat(action.payload),
        headPortrait:action.headPortrait,
    nickname:action.nickname,
userRedpacketSum:action.userRedpacketSum})
  },
   

}
const initialState = {
    detailList:[],
    headPortrait:"",
    nickname:"无名氏",
    userRedpacketSum:0,
    fetching:false
}

export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}