import fetch from 'isomorphic-fetch'
import utils from '../../../utils/utils';
import weChatUtil from '../../../utils/wechatUtil';
import commonData from '../../commonData';

//action
const DATAFETCH_HOMEVIEW = 'DATAFETCH_HOMEVIEW'
const JUDGE_SELF = 'JUDGE_SELF'
const PRAISESHOW = 'PRAISESHOW'
const REWARDSHOW = 'REWARDSHOW'
const USERINFO = 'USERINFO'
const MOODWEATHER = 'MOODWEATHER'
//action创建函数

function dataInit(value) {
  return {
    type: DATAFETCH_HOMEVIEW,
    value: value
  }
}

function userInfo(value){
  return {
    type:USERINFO,
    value:value
  }
}

function isSelf(value) {
  return {
    type: JUDGE_SELF,
    value: value
  }
}

function praiseShow(value) {
  return {
    type: PRAISESHOW,
    value: value
  }
}

function rewardShow(value) {
  return {
    type: REWARDSHOW,
    value: value
  }
}

function moodWeather(value) {
  return {
    type:MOODWEATHER,
    value:value
  }
}

//获取信息
export function init() {
  return (dispatch, getState) => {

    weChatUtil.isLogin(commonData.trueUrl + '/challenge/challenge-detail');

    //验证是否可以点赞
    var selfId = localStorage.getItem('userId'),
      otherId = utils.queryValue.get(location.href, 'userName');

    console.log(selfId + '和' + otherId);

    dispatch(isSelf(selfId == otherId || selfId != otherId && otherId == null));

    //获取当前信息
    fetch(commonData.trueUrl + '/challenge/game/getChallengeInformation.do', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'userName=' + localStorage.getItem('userId') + '&date=' + utils.queryValue.get(location.href, 'date') + '&gameId=' + utils.queryValue.get(location.href, 'gameId')
    }).then(response => response.json()).then(json => {
      var goleWidth = (json.values.goleCalorie / json.values.finalCalorie) * 100 + '%'
      var addWidth = (json.values.addCalorie / json.values.finalCalorie) * 100 + '%'
      var a = {
        calorieSum: json.values.finalCalorie,
        addCalorie: json.values.addCalorie,
        goleCalorie: json.values.goleCalorie,
        goleWidth: goleWidth,
        addWidth: addWidth,
        challengeContent: json.values.challengeContent,
        totalWelfare: json.values.totalAmount,
        statue:json.values.statue,
        pictureUrl:json.values.pictureUrl
      }
      dispatch(dataInit(a))
    });

    //获取用户信息
    fetch(commonData.trueUrl + '/challenge/user/getUserInfo.do', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'userName=' + (otherId || selfId)
    }).then(response => response.json()).then(json => {
      dispatch(userInfo(json.values));
    });

    //获取用户的信息
        fetch('http://camp.liver-cloud.com/platform/livercloud/v1/platform/getUserHomePageInfo.do', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'userName=' + (otherId || selfId) + '&date=' + new Date().getTime()
    }).then(response => response.json()).then(json => {
      dispatch(moodWeather(json.values));
    });
  }
}

//赞
export function praiseBtn() {
  return (dispatch, getState) => {
    if (getState().homeData.isSelf) {
      dispatch(praiseShow(false));
      alert('自己不能给自己点赞');
    } else {
      dispatch(praiseShow(true));
      fetch(commonData.trueUrl + '/challenge/game/rinsingPraise.do', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'userName=' + localStorage.getItem('userId') + '&gameId=' + utils.queryValue.get(location.href, 'gameId') + '&userType=0'
      }).then(response => response.json()).then(json => {
        alert('成功了');
      })
    }
  }
}

//赏
export function rewardBtn() {
  return (dispatch, getState) => {
    if (getState().homeData.isSelf) {
      alert('这里是自己')
      dispatch(rewardShow(false));
    } else {
      dispatch(rewardShow(true));
      fetch(commonData.trueUrl + '/challenge/game/applyGoldPraise.do', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'userName=' + localStorage.getItem('userId') + '&gameId=' + utils.queryValue.get(location.href, 'gameId') + '&userType=0' + '&applyType=1' + '&transactionAmount' + '&userType' + '&payType=0'
      }).then(response => response.json()).then(json => {
        alert('成功了');
      })
    }
  }
}


const SWITCH_ACTION = {
  [DATAFETCH_HOMEVIEW]: (state, action) => {
    return ({ ...state,
      data: action.value
    })
  },
  [JUDGE_SELF]: (state, action) => {
    return ({
      ...state,
      isSelf: action.value
    })
  },
  [PRAISESHOW]: (state, action) => {
    return ({
      ...state,
      praiseShow: action.value
    })
  },
  [REWARDSHOW]: (state, action) => {
    return ({
      ...state,
      rewardShow: action.value
    })
  },
  [USERINFO]:(state,action) => {
    return ({
      ...state,
      userInfo:action.value
    })
  },
  [MOODWEATHER]:(state,action) => {
    return ({
      ...state,
      moodWeather:action.value
    })
  }
}

const initalState = {
  data: {
    userName: 'Zyan',
    currentDate: '2016年12月20日',
    currentMood: 5,
    currentWeather: 5,
    totalCalorie: 100,
    isSelf: true,
    selfCalorie: 100,
    friendsCalorie: 0,
    contentString: '这里是好多的文字',
    welfare: 100
  },
  praiseShow: false
}


export default function (state = initalState, action) {
  const handler = SWITCH_ACTION[action.type]

  return handler ? handler(state, action) : state
}