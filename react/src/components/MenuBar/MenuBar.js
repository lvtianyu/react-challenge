import React from 'react'
import {IndexLink, Link} from 'react-router'
import styles from './MenuBar.css'
import PayModule from '../PayModule/PayModule'
import UpdatedPicture from '../UpdatedPicture/UpdatedPicture';

class MenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      welfareShow: false,
      picShow: false,
      params:{
        gameId:0,
        date:null
      }
    }
  }
  componentDidMount() {
    //先进行配置
    alert(location.href.split('#')[0] + '这里是链接');
    fetch('http://camp.liver-cloud.com/platform/weixin/initJSSDK.do?pageUrl=http%3A%2F%2Fcamp.liver-cloud.com%2Fchallenge%2Fpages%2Fadd-challenge.html%3FuserName%3DRACOQ3H7%26challengeDate%3D1483774052186').then(response => response.json()).then(json => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: json.values.appid, // 必填，公众号的唯一标识
        timestamp: json.values.timestamp, // 必填，生成签名的时间戳
        nonceStr: json.values.noncestr, // 必填，生成签名的随机串
        signature: json.values.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    })
  }
  
  addWelfare() {
    this.setState({welfareShow: true});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({params: nextProps.need_params});
  }
  

  hidePayModule() {
    this.setState({welfareShow: false});
  }
  addPic() {
    // this.setState({picShow: true});
        wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
});
  }
  handleUpdatedPicture(){
    return false;
  }
  render() {
    return (
      <div>
      <div className={styles.clear}>
        <div
          className={styles.item}
          onClick={this
          .addWelfare
          .bind(this)}>
          <span className={styles.addWelfare}></span>
          <span>增加福利</span>
        </div>
        <div
          className={styles.item}
          onClick={this
          .addPic
          .bind(this)}>
          <span className={styles.addPic}></span>
          <span>添加照片</span>
        </div>
        <Link to={'/challenge-detail?gameId=' + this.state.params.gameId + '&date=' + this.state.params.date} className={styles.toPre}>
          <span className={styles.preview}></span>
          <span>预览分享</span>
        </Link>
        <PayModule isShow={this.state.welfareShow} hideSelf={this.hidePayModule.bind(this)}/> 
      </div>
        {this.state.picShow
          ? <UpdatedPicture  handleIsShow={this.handleUpdatedPicture.bind(this)}/>
          : ''}
          </div>
    )
  }
}

export default MenuBar;