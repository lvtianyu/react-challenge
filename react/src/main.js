import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import utils from './utils/utils';

// ======================================================== Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ======================================================== Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

/**
 * 设置根源素的字体的大小
 */
let html = document.documentElement;
html.style.fontSize = html.clientWidth / 7.5 + 'px';

var href = location.href;
if(href.indexOf('gameId') === -1){
  
}

/**
 * 将参数存入本地
 */

var href = location.href;
var userId = utils.queryValue.get(href,'userName') || 'X9T7P2EI',
challengeDate = utils.queryValue.get(href,'challengeDate') || new Date().getTime(),
gameId ;
if(utils.queryValue.get(href,'gameId')){
  gameId = utils.queryValue.get(href,'gameId')
}else{
  
}

localStorage.setItem('userId',userId);
localStorage.setItem('challengeDate',challengeDate);
localStorage.setItem('gameId',gameId);
localStorage.setItem('openid','ohS1ov0ek7tKlj-nGASYpOe_u-pk');


/**
 * 程序入口
 */
let render = () => {
  //引入各个路由
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
    <AppContainer store={store} routes={routes}/>, MOUNT_NODE)
}

/**
 * 开发工具设置
 */
if (__DEV__) {
  if (window.devToolsExtension) {
    window
      .devToolsExtension
      .open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(
        <RedBox error={error}/>, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module
      .hot
      .accept('./routes/index', () => setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      }))
  }
}


/**
 * 渲染
 */
render()
