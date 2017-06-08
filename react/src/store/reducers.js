import {
  combineReducers
} from 'redux'
import locationReducer from './action'

//随着应用的复杂度变高，需要对每一个reduces进行拆分，通过combineReducers方法将所有的子reducer进行合并
export const makeRootReducer = (asyncReducers) => {
  //随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分
  //2、其实这里返回的就是拆分后的reducer

  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
// 1、这个injectreducer在每个模块的index.js中被调用，将页面中的store传入
// 和绑定的key 值，将modules下的js文件传进来，但现在的reducer还是为拆分的
// 　
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer