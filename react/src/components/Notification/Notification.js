import React, {Component} from 'react'
import classes from './Notification.scss'
export default class Notification extends Component{
    constructor(props) {
    super(props);
    this.state={show:false}
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1750
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      show: true
    });
  }
    render(){
       return <i className={this.state.show?'notificationHidden':'notification'}>
        <div>
             {this.props.notice}
             
        </div>
        </i>
    }
}