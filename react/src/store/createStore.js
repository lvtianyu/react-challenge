import { applyMiddleware, compose, createStore } from 'redux' //store过程
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './action'


//创建 Redux store 来存放应用的状态。
export default (initialState = {}) => {
  // ======================================================
  // 中间件配置
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }
  /**
   * 创建store
   */
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(//compose 做的只是让你不使用深度右括号的情况下来写深度嵌套的函数。不要觉得它很复杂。
      applyMiddleware(...middleware),//使用 Thunk Middleware 来做异步 Action
      ...enhancers
    )
  )

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` //anytime取消监听
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      //这里有做了一遍replacereducer
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
