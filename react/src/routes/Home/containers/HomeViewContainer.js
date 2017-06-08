//容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。
import {
  connect
} from 'react-redux'
import {
  fetchDataDis,init,praiseBtn,rewardBtn
} from './../modules/HomeView'
import HomeView from './../components/HomeView'

// mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchtoProps = {
  fetchDataDis,init,praiseBtn,rewardBtn
}

//指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = (state) => ({
  homeData:state.homeData
})

//绑定到一起
export default connect(mapStateToProps, mapDispatchtoProps)(HomeView)