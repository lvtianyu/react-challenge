import {connect} from 'react-redux'
import {init,handleWheelList,handleTop} from '../modules/list'
import List from '../components/List'

//用户事件、数据操作以及它们的处理程序看起来像controller
//action creators -> action ->dispatcher ->callback
 const mapDispatchToProps ={
     init,
     handleTop,
          handleWheelList,

 }
 //model 看起来像 store 所以 这部分绑定state的数据而不是state中的方法
 const mapStateToProps = (state) => {
     return {
         supportList: state.supportList
     }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(List)