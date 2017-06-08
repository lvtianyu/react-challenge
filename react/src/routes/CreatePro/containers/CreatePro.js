import {
  connect
} from 'react-redux'
import {
  inputCalorie,inputDes,saveBtnClick,init
} from './../modules/CreatePro.js'
import CreatePro from './../components/CreatePro'

// mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法

const mapDispatchtoProps = {
  inputCalorie,inputDes,saveBtnClick,init
}

//指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = (state) => ({
  cre:state.cre
})

//绑定到一起
export default connect(mapStateToProps, mapDispatchtoProps)(CreatePro)
