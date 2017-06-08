import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'message',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Message = require('./containers/MessageContainer').default
      const reducer = require('./modules/message').default
      injectReducer(store, { key: 'dataMessage', reducer })
      cb(null, Message)
    })
  }
})
