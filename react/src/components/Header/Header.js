import React from 'react'
import {IndexLink, Link} from 'react-router'
import './moodweather.scss'
import './Header.scss'
import '../../styles/core.scss'
import DuckImage from '../../routes/Home/assets/Duck.jpg'
import utils from '../../utils/utils';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      userName: '姓名',
      time:utils.timeFormatting.toDate(new Date().getTime())
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({image: nextProps.userData && nextProps.userData.headPortraitUrl, userName: nextProps.userData && nextProps.userData.nickName, time:nextProps.userData && utils.timeFormatting.toDate(nextProps.userData.createTime)})
  }

  render() {
    console.log(this.props.moodData && this.props.moodData.mood + '这里是fafsdf数据');
    return (
      <div className="titlebar clear">
        <div className="fl">
          <img src={this.state.image} alt="头像" className="headerimg"/>
          <span className="name text">{this.state.userName}</span>
          <time className="date text">{this.state.time}</time>
        </div>
        <div className="fr">
          <span  className={'weatherStyle' + (this.props.moodData && this.props.moodData.weather) +' flag'}></span>
          <span  className={'moodStyle' + (this.props.moodData && this.props.moodData.mood) +' flag'}></span>
        </div>
      </div>
    )
  }
}

export default Header
