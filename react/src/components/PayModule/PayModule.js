import React from 'react';
import styles from './PayModule.css';

class PayModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "none",
            total_fee:null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isShow) {
            this.setState({ display: "block" })
        }else {
            this.setState({ display: "none" })
        }
    }

    disappearClick(evt) {
        evt.target.style.display = 'none';
    }
    panelClick(evt) {
        evt.stopPropagation();
    }
    inputFee(evt){
        this.setState({total_fee:evt.target.value});
    }
    btnClick(evt) {
            fetch('http://camp.liver-cloud.com/challenge/challenge/game/addWelfareOfficialAccount.do', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'gameId=' + localStorage.getItem('gameId') +'&openid=' + localStorage.getItem('openid') + '&userName=' + localStorage.getItem('userId') + '&total_fee=' + this.state.total_fee
    }).then(response => response.json()).then(json => {
        console.log(json.values.signType + '你好');
        wx.chooseWXPay({
    timestamp: json.values.timeStamp,
    nonceStr: json.values.nonceStr, 
    package: json.values.package, 
    signType: json.values.signType, 
    paySign: json.values.paySign, 
    success: function (res) {

    }
});
    })
    }
    componentWillMount() {
        if (this.props.isShow) {

        } else {

        }
    }
    render() {
        return ( 
            <div className = { styles.cover }
            onClick = { this.props.hideSelf } 
            style={{display: this.state.display}} >
            <div className = { styles.panel }
            onClick = { this.panelClick.bind(this) } >
            <p className = { styles.title } > 当前福利0元 </p> 
            <label htmlFor = "money"
            className = "clear" >
            增加福利： <input type = "number"
            className = { styles.money }
            placeholder = "2" onChange = {this.inputFee.bind(this)} / > 
            <span className = { styles.rightspan } > 元 </span>
             </label >
             <p className = { styles.pContent } > 活动结束后， 增加的福利将以红包的形式发给您的好友 </p>
              <button className = { styles.btn }
            onClick = { this.btnClick.bind(this) } > 微信支付 </button> 
            </div> 
            </div>
        )
    }
}

export default PayModule;