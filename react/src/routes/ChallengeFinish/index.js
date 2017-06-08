import { injectReducer } from '../../store/reducers'
import a from "./containers/ChallengeFinishContainer";
import b from "./modules/challengeFinish"

export default (store) => ({
  path: 'challengeFinish',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Zen = a
      const reducer =b
      injectReducer(store, { key: 'data', reducer })
      cb(null, Zen)
    })
  }
})
