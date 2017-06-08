import React, {Component, PropTypes} from 'react'
import {browserHistory, Router, Route} from 'react-router'
//Redux提供的高阶组件，用来将redux绑定到react
import {Provider} from 'react-redux'
import {RouteTransition} from 'react-router-transition';


class AppContainer extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    const {routes, store} = this.props
    return (
      //提供了一个用于更新视图组件的网络，里边的container组件通过connect方法获取状态的更新
      <Provider store={store}>
        {/*Router只是一个组件，起路由作用的是Route，在这之中，子路由可以不嵌套写，可以传入routes属性里 */}
        <Router history={browserHistory} routes={routes}>
        </Router>
      </Provider>
    )
  }
}

React.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
