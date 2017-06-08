import fetch from 'isomorphic-fetch'
const RECEIVE_FINISHSHOW = 'RECEIVE_FINISHSHOW'
const REQUEST_FINISHSHOW = 'REQUEST_FINISHSHOW'
const INIT = 'INIT'
const UPDATED_PICTURE="UPDATED_PICTURE"

function requestFinishShow() {
  return {
    type: REQUEST_FINISHSHOW
  }
}

function updatedPicture(value){
    return {
    type: UPDATED_PICTURE,
    isShow:value
  }
}

 const receiveFinishShow = (value) => ({
  type: RECEIVE_FINISHSHOW,
  payload: value
})

 function init() {
  return (dispatch, getState) => {
   let finishShow=localStorage.getItem("finishShow")||false
    dispatch(receiveFinishShow(finishShow))

  }
}


 function handleUpdatedPicture(a = true) {
  return (dispatch, getState) => {
    return dispatch(updatedPicture(a))

  }
}

export const actions={
    handleUpdatedPicture,
    requestFinishShow,
    receiveFinishShow,
    init,
    updatedPicture
}  


const ACTION_HANDLERS = {
  [REQUEST_FINISHSHOW]: (state) => {
    return ({...state,
      fetching: false
    })
  },
  [RECEIVE_FINISHSHOW]: (state, action) => {
    return ({...state,
      fetching: true,
      isOk: action.payload
    })
  },
  [UPDATED_PICTURE]:(state,action)=>{
    return({
      ...state,pictureList:action.isShow
    })
  }

}

const initialState = {
  fetching: false,
  pictureList: false,
  isOk: true,
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}