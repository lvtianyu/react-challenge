import DuckImage from '../assets/Duck.jpg'
import styles from './HomeView.css';
import React from 'react'
import WeUI from 'react-weui';
import utils from '../../../utils/utils';

import FooterBar from '../../../components/FooterBar'
import Header from '../../../components/Header'
import {IndexLink, Link} from 'react-router'
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import PayModule from '../../../components/PayModule/PayModule';
import failuer from '../../../static/failure.png';

const {Toast} = WeUI;
class HomeView extends React.Component {

  constructor(props) {
    super(props);
    const init = this.props.init;
    init();
  }

  componentWillMount() {}

  componentDidMount() {}
  hidePayModule() {
    this.setState({welfareShow: false});
  }
  componentWillReceiveProps(nextProps) {
    var n = nextProps.homeData.data.calorieSum / nextProps.homeData.data.goleCalorie * 5.6 * document.documentElement.clientWidth / 7.5;
    nextProps.homeData.praiseShow && console.log('这里是要显示是自己');
    nextProps.homeData.rewardShow && console.log('你好');
    utils.animation(document.querySelector('.' + styles.progressbarline), 'width', n);
  }

  render() {
    const {praiseBtn, rewardBtn} = this.props;
    var finishFailure = {
      display: 'inline-block',
      width: '.4rem',
      height: '.3rem',
      backgroundImage: 'url(' + failuer + ')',
      backgroundSize: 'contain',
      verticalAlign: 'sub',
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div>
        <Header
          userData={this.props.homeData.userInfo}
          moodData={this.props.homeData.moodWeather}/>
        <div className={styles.content}>

          <header className={styles.header}>
            <div className={styles.border}>
              <div className={styles.redpackageflag}>
                <span className={styles.welfaretext}>红包福利</span>
                <span className={styles.welfarenum}>{this.props.homeData.data.totalWelfare}元</span>
              </div>
            </div>
            <Link
              style={{
              display: this.props.homeData.data.statue == 0
                ? 'block'
                : 'none'
            }}
              className={styles.editbtn}
              to={'/add-challenge?goleCalorie=' + this.props.homeData.data.goleCalorie + '&challengeContent=' + this.props.homeData.data.challengeContent}></Link>
          </header>

          <div
            style={{
            display: this.props.homeData.data.statue == 0
              ? 'none'
              : 'block'
          }}
            className={styles.clear}>
            <div className={styles.finishAim}>
              <span className={styles.image}></span>
              <span>目标{this.props.homeData.data.goleCalorie}卡</span>
            </div>
            <div className={styles.finishFinish}>
              <span style={finishFailure}></span>
              <span>完成{this.props.homeData.data.calorieSum}卡</span>
            </div>
          </div>

          <div >
            <div
              style={{
              display: this.props.homeData.data.statue == 0
                ? 'block'
                : 'none'
            }}>
              <span className={styles.calorielogo}></span>
              <span>总计{this.props.homeData.data.calorieSum}千卡路里</span>
            </div>
            <div className={styles.progressbar}>
              <div className={styles.baseLine}>
                <div className={styles.progressbarline}></div>
              </div>
              <span className={styles.first}>目标{this.props.homeData.data.goleCalorie}卡</span>
              <span className={styles.second}>朋友支持{this.props.homeData.data.addCalorie}卡</span>
            </div>
          </div>

          <div
            className={styles.clear}
            style={{
            display: this.props.homeData.data.statue
              ? 'block'
              : 'none'
          }}>
            <div className={styles.admireDiv}>
              <button className={styles.agree} onClick={praiseBtn}>赞</button>
              <span>0人点赞</span>
            </div>
            <div className={styles.admireDiv}>
              <button className={styles.award} onClick={rewardBtn}>赏</button>
              <span>0人赏</span>
            </div>
          </div>
          <p className={styles.leavemessage}>{this.props.homeData.data.challengeContent}</p>
          <ul>
          {this.props.homeData.data.pictureUrl && this.props.homeData.data.pictureUrl.map((get,index) => (
            <li key={index}>
              <img src="../assets/Duck.jpg" alt="一个"/>
            </li>
          ))}
          </ul>
        </div>
        <FooterBar footData={this.props.homeData.data.statue}/>
      </div>
    );
  }

}

HomeView.propTypes = {
  homeData: React.PropTypes.object.isRequired
}

export default HomeView
