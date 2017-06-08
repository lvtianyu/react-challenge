import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'finishShow',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const FinishShow = require('./containers/FinishShowContainer').default
      const reducer = require('./modules/finishShow').default
      injectReducer(store, { key: 'dataFinishShow', reducer })
      cb(null, FinishShow)
    })
  }
})
