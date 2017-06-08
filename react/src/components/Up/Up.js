import React,{Component} from 'react'
import classes from './up.scss'
export default class Up extends Component{
    constructor(props){
        super(props)
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(){
      this.props.handleUp(false)
    }
    render(){
        
        return(
            <a  href="javascript:scrollTo(0,0);"
             className={this.props.data?'UpTop':'UpTopHid'}  
             onClick={this.handleClick}>
                <img src="" />
            </a>
        )
    }
}