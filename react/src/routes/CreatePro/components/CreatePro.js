import React, {Component, PropTypes} from 'react'
import MenuBar from '../../../components/MenuBar/MenuBar'
import PayModule from '../../../components/PayModule/PayModule'
import {connect} from 'react-redux'

import styles from './CreatePro.css';

class CreatePro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aimCalorie: '',
      desContent: '',
      isShow: true
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState({aimCalorie: nextProps.cre.aimCalorie, desContent: nextProps.cre.challengeDes});

    nextProps.cre.isShow.value1 != undefined ? this.setState({isShow: nextProps.cre.isShow.value1}) : ''

    if (nextProps.cre.initValue != undefined) {
      this.setState({aimCalorie: nextProps.cre.initValue.aimCalorie, desContent: nextProps.cre.initValue.desContent});
      if (nextProps.cre.isShow.value2) 
        this.setState({isShow: true})
    }

  }

  componentDidMount() {
    const init = this.props.init;
    init();
  }
  render() {
    const {inputCalorie, inputDes, saveBtnClick} = this.props;
    var enabled = {
      disabled: !this.state.isShow ? 'disabled' : ''
    }
    console.log(enabled + '那好嘛')
    console.log(this.props.cre.isShow);
    return (
      <div className={styles.createpro}>
        <div className={styles.inputtext}>
          目标:<input
            type="number"
            className={styles.input}
            placeholder={this.props.cre.placeholder.defaultCalorie}
            onChange={inputCalorie}
            value={this.state.aimCalorie}
            disabled={!this.state.isShow}
            />千卡
        </div>
        <p className={styles.p}>提示：1千卡≈24步，您的目标相当于走了<span>{this.props.cre.aimCalorie * 24}</span>步</p >
        <textarea
          placeholder={this.props.cre.placeholder.defaultContent}
          className={styles.textdesc}
          onChange={inputDes}
          value={this.state.desContent}
          disabled={!this.state.isShow}></textarea>
        <div
          className={styles.saveBox}
          style={{
          display: this.state.isShow
            ? 'block'
            : 'none'
        }}>
          <button
            onClick={saveBtnClick}
            className={this.state.aimCalorie && this.state.desContent
            ? styles.buttonEnable
            : styles.button}
            disabled={this.state.aimCalorie && this.state.desContent
            ? ''
            : 'disabled'}>保存</button>
        </div>
        {!this.state.isShow
          ? <MenuBar
              type="menu"
              is_show={this.props.cre.isShow}
              need_params={this.props.cre.params}/>
          : ''
}

      </div>
    )
  }
}
CreatePro.propTypes = {
  cre: React.PropTypes.object.isRequired
}

export default CreatePro;