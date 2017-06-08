import fetch from 'isomorphic-fetch'
import {
  dispatch
} from 'react-redux';
import utils from '../../../utils/utils';

/**
 * acion类型
 */
const INPUT_CALORIE = 'INPUT_CALORIE';
const INPUT_CHALLENGDES = 'INPUT_CHALLENGDES';
const SAVE_BTN = 'SAVE_BTN';
const TRANSFORMID = 'TRANSFORMID';
const INITSTATE = 'INITSTATE';


//获取信息
var href = location.href,
  saveApi = 'http://camp.liver-cloud.com/challenge/challenge/game/addChallengeMessage.do';

var re = new RegExp('^[0-9]*$');

//创建action函数
export function inputCalorie(evt) {
  return {
    type: INPUT_CALORIE,
    inputCalorie: re.test(evt.target.value) ? evt.target.value : ''
  }
}

export function inputDes(evt) {
  return {
    type: INPUT_CHALLENGDES,
    inputDes: evt.target.value
  }
}

export function changeShow(valu) {
  return {
    type: SAVE_BTN,
    value: valu
  }
}

function initState(initData) {
  return {
    type: INITSTATE,
    value: initData
  }
}

function transformID(value) {
  return {
    type: TRANSFORMID,
    params: value
  }
}


/**
 * 初始化
 */
export function init() {
  return (dispatch, getState) => {
    var href = location.href,
      aimCalorie = utils.queryValue.get(href, 'goleCalorie'),
      desContent = utils.queryValue.get(href, 'challengeContent');

    const initValue = {
      aimCalorie: aimCalorie,
      desContent: desContent
    }

    if (aimCalorie) {
      dispatch(initState(initValue));
      dispatch(changeShow({value1:false,value2:true}));
    } else {

    }
  }
}


//保存
export function saveBtnClick() {
  return (dispatch, getState) => {
    var aimCalorie = getState().cre.aimCalorie;
    var challengeDes = getState().cre.challengeDes;

    fetch(saveApi, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'goleCalorie=' + aimCalorie + '&challengeContent=' + challengeDes + '&userName=' + localStorage.getItem('userId') + '&type=0&calendarDate=' + utils.timeFormatting.toFormate(new Date().getTime())
    }).then(response => response.json()).then(json => {
      if (json.errorcode == '000000') {
        dispatch(transformID({
          gameId: 100,
          date: utils.timeFormatting.toFormate(new Date().getTime())
        }));
      } else {
    }})
    dispatch(changeShow({value1:false,value2:!getState().cre.isShow.value2}));
  }
}

function writeObj(obj) {
  var description = "";
  for (var i in obj) {
    var property = obj[i];
    description += i + " = " + property + "\n";
  }
}


//选择多个Action
const SWITCH_ACTION = {
  [INPUT_CALORIE]: (state, action) => {
    return ({...state,
      aimCalorie: action.inputCalorie,
    })
  },
  [INPUT_CHALLENGDES]: (state, action) => {
    return ({...state,
      challengeDes: action.inputDes,
    })
  },
  [SAVE_BTN]: (state, action) => {
    return ({...state,
      isShow: action.value,
    })
  },
  [TRANSFORMID]: (state, action) => {
    return ({...state,
      params: action.params
    })
  },
  [INITSTATE]: (state, action) => {
    return ({...state,
      initValue: action.value
    })
  }
}

//原始状态
const initalState = {
  aimCalorie: '',
  isShow: true,
  placeholder: {
    defaultCalorie: 300,
    defaultContent: '描述：描述活动'
  }
}

export default function (state = initalState, action) {
  const handler = SWITCH_ACTION[action.type]
  return handler ? handler(state, action) : state
}