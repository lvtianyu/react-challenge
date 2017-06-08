import {
  injectReducer
} from '../../store/reducers'

//子路有配置表
export default (store) => ({
   path: '/add-challenge',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      //对应关系
      const CreatePro = require('./containers/CreatePro').default
        //reducer
      const reducer = require('./modules/CreatePro').default
      injectReducer(store, {
        key: 'cre',
        reducer
      })
      cb(null, CreatePro)
    })
  }
  // onEnter: function (nextState, replaceState) {
  //   var params = nextState.location.search;
  //   var userInfo = {
  //     userName:utils.queryValue.get(params,'userName'),

  //   },
  //   challengeDate = utils.queryValue.get(params,'challengeDate');
  //   localStorage.setItem('userInfo',userInfo);
  //   localStorage.setItem('challengeDate',challengeDate);
  //   if (params.indexOf('gameId') === -1) {} else {
  //     replaceState('/homeView')
  //   }
  // }
})