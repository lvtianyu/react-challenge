import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: 'detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Detail = require('./containers/DetailContainer').default
      const reducer = require('./modules/detail').default
      injectReducer(store, { key: 'dataDetail', reducer })
      cb(null, Detail)
    },'detail')
  }
})