import {connect} from 'react-redux'
import Test from '../components/Test'


 const mapDispatchToProps ={
     
 }

 const mapStateToProps = (state) => {
     return {
         data:''
     }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(Test)