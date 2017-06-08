import {injectReducer} from '../../store/reducers'
export default (store) =>({
    path:'picture',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            const Picture = require('./containers/PictureContainers').default
            const reducer = require('./modules/picture').default

            injectReducer(store,{key:'message',reducer})
            cb(null,Picture)

        },'picture')
    }
})