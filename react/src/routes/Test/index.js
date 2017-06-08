import {injectReducer} from '../../store/reducers'
export default(store)=>({
    path:'test',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
    const Test = require('./containers/TestContainers').default

            cb(null,Test)

        },'Test')
    }
})