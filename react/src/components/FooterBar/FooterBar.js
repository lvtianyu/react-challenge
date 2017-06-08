import React, {Component, PropTypes} from 'react'
import {IndexLink, Link} from 'react-router'
import PayModule from '../../components/PayModule/PayModule'
import './FooterBar.scss'
import redImage from '../../static/operation-icon07.png';
import finishImage from '../../static/finishbtn.png';

class FooterBar extends Component {
  constructor(props) {
    super(props);
  }

  finishBtnClick() {
    document
      .querySelector('.pay_module')
      .style
      .display = 'block';
  }
  render() {
    var redImageS = {
        backgroundImage: 'url(' + redImage + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      },
      finishImageS = {
        backgroundImage: 'url(' + finishImage + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }
    return (
      <div className="footerbar">
        <div className="button finishbtn" onClick={this.finishBtnClick}>
          <div>
            <span
              style={this.props.footdata == 0
              ? finishImageS
              : redImageS}></span>
          </div>
          <div >
            <Link to={this.props.footdata == 0 ? '/finishShow' : '/detail'} activeClassName='route--active' className="width">
              {this.props.footData == 0
                ? '挑战完成'
                : '红包明细'}
            </Link>
          </div>
        </div>

        <div className="button agreebtn">
          <div>
            <span></span>
          </div>
          <div>
            <Link to='/list' activeClassName='route--active' className="width">
              点赞榜
            </Link>
          </div>

        </div>

        <div className="button messagebtn">
          <div>
            <span></span>
          </div>

          <div>
            <Link to='/message' activeClassName='route--active' className="width">
              留言
            </Link>
          </div>
        </div>

        <div className="pay_module">
          <PayModule/>
        </div>
      </div>

    );
  }
}
export default FooterBar
