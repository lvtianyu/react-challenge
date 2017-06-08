// ------------------------------------
// 定义常量
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
  // 底部选项卡
export const FOOTER_BAR = 'FOOTER_BAR'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

export function changeFooterBar(arr) {
  return {
    type: FOOTER_BAR,
    arr
  }
}

// ------------------------------------
// dispatch
// ------------------------------------
export const updateLocation = ({
  dispatch
}) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

//直接dispatch
// dispatch(changeFooterBar(arr));
//创建一个 被绑定的 action 创建函数 来自动 dispatch
const boundAddTodo = (text) => dispatch(addTodo(text))

const initialState = {
  footerBar:{
    title:['你好'],
    titleImage:[],
    hidden:false
  },
  isSelf:'ture'
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function locationReducer(state = initialState, action) {
  return action.type === LOCATION_CHANGE ? action.payload : state;
}