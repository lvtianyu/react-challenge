import React,{Component} from 'react'
import messageCss from './Message.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import Format from '../../../components/publick'
import Nothing from '../../../components/Nothing/Nothing'


function translateTime (value){
    var c =new Date(value).Format("yyyy-MM-dd")
    return String(c)
}

//显示列表的组件
class List extends Component{
      render() {
    return <ul>
       {this.props.list.map((get,index) => (
               <li key={index}>
                                <div>
                                    {get.nikeName || "过客"}：
                                </div>
                                <p>{get.content}</p>
                                <span>
                                    {translateTime(get.createTime)}
                                </span>
                            </li>
          ))}
    </ul>;
  }
}

export default class Message extends Component {
    constructor(props){
        super(props)
        }
    componentDidMount() {
            const init = this.props.init;
            init();
        }
    render(){
        const { handleChange,
                handleClick,
                dataMessage
            }=this.props
        const {messageList,changeColor,sayValue,fetching}=dataMessage
        return(
            <div className='message'>
                <div>
                  {
                    !fetching?
                    <Circle />
                    :messageList.length>0?<List list={messageList} />:<Nothing/>
                    }
                </div>
            
                 <div className={changeColor ? 'btn' : ''} >
                    <input type="text" placeholder="说点什么..." 
                    value={sayValue}
                    onChange={handleChange}
                    />
                    <button 
                    className='clickActiveShow' 
                    onClick={handleClick}
                    >发送</button>

                 </div>
            </div>
        )
    }
}

Message.propTypes={
    dataMessage:React.PropTypes.object.isRequired
}