import {injectReducer} from '../../store/reducers'
export default(store)=>({
    path:'list',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            const List = require('./containers/ListContainers').default

            //将数据部分特意分出来 就是让它更像model层
            const reducer = require('./modules/list').default
            injectReducer(store,{key:'supportList',reducer})
            cb(null,List)
        },'List')
    }
})