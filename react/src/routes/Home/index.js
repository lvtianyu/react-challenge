import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path:'/challenge-detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeView = require('./containers/HomeViewContainer').default
      const reducer = require('./modules/HomeView').default
      injectReducer(store, { key: 'homeData', reducer })
      cb(null, HomeView)
    })
  }
})
