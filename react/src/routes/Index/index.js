import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./IndexPage').default
      cb(null, Index)
    })
  }
})
